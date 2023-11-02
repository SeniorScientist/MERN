import { Box, Center, CircularProgress, Flex, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { DEFAULT_PAGE_SIZE } from "@/constants/table"
import useTableStateManager from "@/hooks/useTableStateManager"
import Header from "./TableHead"
import TablePagination from "./TablePagination"
import TableRow from "./TableRow"
import TableToolbar from "./TableToolbar"
import moment from "moment"

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
  totalCount: number
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
  onTaskDelete?: () => void
  onRowClick: (row: any) => void
  updatePath: (e: string) => void
}

const ReusableTable = (props: ReuseableTableProps) => {
  const {
    data = [], totalCount, rowId = 'id', columns, selectable, loading, pageSize = DEFAULT_PAGE_SIZE, searchable = true, searchFields = [],
    onSelectRows, useUrlQuery, ssr, ssrQueryFunc, onTaskCreate, onTaskDelete, onRowClick, updatePath
  } = props

  const { page, sortedBy, searchText, changeSearchText, changeSortedBy, changePage } = useTableStateManager({ byUrlQuery: useUrlQuery, updatePath })
  const [displayData, setDisplayData] = useState<any[]>([])
  const [selectedRows, setSelectedRows] = useState(new Map())
  const [total, setTotal] = useState(0)
  const [mounted, setMounted] = useState(false)


  useEffect(() => {
    setTimeout(() => setMounted(true), 500)
  }, [])

  useEffect(() => {
    if (ssr) return
    updatePageData()

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
      setDisplayData(
        data.map((e, index: number) => ({
          id: ((page - 1) * pageSize) + index + 1,
          rowId: e._id,
          _id: e._id,
          title: e.title,
          description: e.description,
          createdAt: moment(e.createdAt).format('MM/DD/YYYY hh:mm:ss')
        })))
    }
  }

  const onSelectedRow = (row: any) => {
    const newMap = new Map(selectedRows)
    if (newMap.has(row[rowId])) newMap.delete(row[rowId])
    else newMap.set(row[rowId], row)

    setSelectedRows(newMap)
    if (onSelectRows) onSelectRows(Array.from(newMap.values()))
  }

  const isEmpty = !loading && totalCount === 0

  return (
    <Box position='relative'>
      {loading && (
        <Center position='absolute' w='100%' h='100%' bgColor='white'>
          <CircularProgress isIndeterminate />
        </Center>
      )}
      <Box minH='200px' opacity={loading ? 0.5 : 1}>
        <Flex alignItems='center' py='10px'>
          <TableToolbar searchable={searchable} defaultSearch={searchText} onSearch={mounted ? changeSearchText : undefined} removable={selectedRows.size > 0} onCreate={onTaskCreate} onDelete={onTaskDelete} />
        </Flex>
        <Header
          selectable={selectable}
          columns={columns}
          onChangeSortedBy={changeSortedBy}
          sortKey={sortedBy[0]}
          order={sortedBy[1]}
        />
        <Flex flexDir='column'>
          {isEmpty && <Center><Text margin="6">No data</Text></Center>}
          {displayData.map((item, index) => {
            return (
              <TableRow
                key={item[rowId] || index}
                columns={columns}
                itemData={item}
                selectable={selectable}
                selected={selectedRows.has(item[rowId])}
                onSelected={onSelectedRow}
                handleClick={item => onRowClick(item)}
              />
            )
          })}
        </Flex>
        <Flex mt='20px' justifyContent='flex-end'>
          <TablePagination
            page={page}
            pageSize={pageSize}
            total={totalCount}
            onPageChanged={changePage}
          />
        </Flex>
      </Box>
    </Box>
  )
}

export default ReusableTable