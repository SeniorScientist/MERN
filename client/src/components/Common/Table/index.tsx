import { Box, Center, CircularProgress, Flex, Text } from "@chakra-ui/react"
import { useEffect, useMemo, useRef, useState } from "react"
import { DEFAULT_PAGE_SIZE } from "@/constants/table"
import useTableStateManager from "@/hooks/useTableStateManager"
import Header from "./TableHead"
import TablePagination from "./TablePagination"
import TableRow from "./TableRow"
import TableToolbar from "./TableToolbar"
import { Task } from "@/types/task"

export interface ColumnConfig {
  key: string
  flex?: number
  width?: number
  label?: string
  sortable?: boolean
  render?: (row: any) => JSX.Element
}

export interface TableQueryParams {
  search?: string
  sortBy?: string
  order?: string
  page?: number
  pageSize?: number
}

export interface TableQueryResult {
  data: any[]
  count: number
}

interface ReuseableTableProps {
  columns: ColumnConfig[]
  data?: any[]
  rowId?: string
  selectable?: boolean
  onSelectRows?: (rows: any[]) => void
  loading?: boolean
  searchable?: boolean
  searchFields?: string[]
  pageSize?: number
  useUrlQuery?: boolean
  ssr?: boolean
  ssrQueryFunc?: (params: TableQueryParams) => Promise<TableQueryResult>,
  onTaskCreate?: () => void
}

const ReusableTable = (props: ReuseableTableProps) => {
  const {
    data = [], rowId = 'id', columns, selectable, loading, pageSize = DEFAULT_PAGE_SIZE, searchable = true, searchFields = [],
    onSelectRows, useUrlQuery, ssr, ssrQueryFunc, onTaskCreate
  } = props
  
  const { page, sortedBy, searchText, changeSearchText, changeSortedBy, changePage } = useTableStateManager({ byUrlQuery: useUrlQuery})
  const [displayData, setDisplayData] = useState<any[]>([])
  const [selectedRows, setSelectedRows] = useState(new Map())
  const [total, setTotal] = useState(0)
  const [mounted, setMounted] = useState(false)

  // const allData = useRef<any>([])
  let allData: Task[] = []

  useEffect(() => {
    setTimeout(() => setMounted(true), 1000)
  }, [])

  useEffect(() => {
    if (!ssr) filterAllData()
    if (mounted && page !== 1) changePage(1)
    else updatePageData()
  }, [searchText])

  useEffect(() => {
    if (!ssr) sortAllData()
    if (mounted && page !== 1) changePage(1)
    else updatePageData()
  }, [sortedBy])

  useEffect(() => {
    updatePageData()
  }, [page])

  useEffect(() => {
    if (ssr) return
    allData = data
    console.log(allData)
    if (searchText && searchable) filterAllData()
    if (sortedBy) sortAllData()
    updatePageData()
    console.log(allData)
  }, [data])

  const updatePageData = () => {
    if (ssr) {
      if (!ssrQueryFunc) throw Error('Missing ssrQueryFunc props when use Table in serverside mode!')
      ssrQueryFunc({ search: searchText, sortBy: sortedBy[0], order: sortedBy[1], page, pageSize })
        .then((res: TableQueryResult) => {
          setDisplayData(res.data)
          setTotal(res.count)
        })
    } else {
      console.log('1', allData)
      setDisplayData(allData.slice((page-1)*pageSize, page*pageSize))
      console.log('2', allData)
    }
  }

  const sortAllData = () => {
    allData.sort((a: any, b: any) => {
      let valA = a[sortedBy[0]]
      let valB = b[sortedBy[0]]
      if (typeof valA === 'string' && typeof valB === 'string') {
        return sortedBy[1] === 'desc' ? valA.localeCompare(valB) : valB.localeCompare(valA)
      }
      return sortedBy[1] === 'desc' ? valB-valA : valA-valB
    })
  }

  const filterAllData = () => {
    allData = data.filter(e => {
      for (let key of searchFields) {
        if (String(e[key]).toLowerCase().includes(searchText)) return true
      }
      return false
    })
  }

  const onSelectedRow = (row: any) => {
    const newMap = new Map(selectedRows)
    if (newMap.has(row[rowId])) newMap.delete(row[rowId])
    else newMap.set(row[rowId], row)

    setSelectedRows(newMap)
    if (onSelectRows) onSelectRows(Array.from(newMap.values()))
  }

  const count = useMemo(() => {
    return ssr ? total : allData.length
  }, [allData, total, ssr])

  const isEmpty = !loading && count === 0

  return (
    <Box position='relative'>
      {loading && (
        <Center position='absolute' w='100%' h='100%' bgColor='white'>
          <CircularProgress isIndeterminate />
        </Center>
      )}
      <Box minH='200px' opacity={loading ? 0.5 : 1}>
        <Flex alignItems='center' py='10px'>
          <TableToolbar searchable={searchable} defaultSearch={searchText} onSearch={mounted ? changeSearchText : undefined} onCreate={onTaskCreate}/>
        </Flex>
        <Header
          selectable={selectable}
          columns={columns}
          onChangeSortedBy={changeSortedBy}
          sortKey={sortedBy[0]}
          order={sortedBy[1]}
        />
        <Flex flexDir='column'>
          {isEmpty && <Center><Text>No data</Text></Center>}
          {displayData.map(item => {
            return (
              <TableRow
                key={item[rowId]}
                columns={columns}
                itemData={item}
                selectable={selectable}
                selected={selectedRows.has(item[rowId])}
                onSelected={onSelectedRow}
              />
            )
          })}
        </Flex>
        <Flex mt='20px' justifyContent='flex-end'>
          <TablePagination
            page={page}
            pageSize={pageSize}
            total={count}
            onPageChanged={changePage}
          />
        </Flex>
      </Box>
    </Box>
  )
}

export default ReusableTable