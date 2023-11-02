import { FIRST_PAGE } from '@/constants/table'
import { Flex, Icon, IconButton, Text } from '@chakra-ui/react'
import { useMemo } from 'react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'


interface TablePaginationProps {
  total: number
  page: number
  pageSize: number
  onPageChanged: (page: number) => void
}

const TablePagination = (props: TablePaginationProps) => {
  const { page, total, pageSize, onPageChanged } = props

  const totalPage = useMemo(() => Math.ceil(total / pageSize), [total])

  const handlePrevPage = () => {
    if (page - 1 >= FIRST_PAGE)
      onPageChanged(page - 1)
  }

  const handleNextPage = () => {
    if (page + 1 <= Math.ceil(total / pageSize))
      onPageChanged(page + 1);
  }

  return (
    <Flex alignItems='center' gap='10px'>
      <Text fontSize='14px' fontWeight='medium'>Page {page} of {totalPage}</Text>
      <IconButton
        aria-label='prev'
        variant='outline'
        onClick={handlePrevPage}
        disabled={page <= 1}
        icon={<Icon as={MdChevronLeft} />}
      />
      <IconButton
        aria-label='next'
        variant='outline'
        onClick={handleNextPage}
        disabled={page >= totalPage}
        icon={<Icon as={MdChevronRight}
        />}
      />
    </Flex>
  )
}

export default TablePagination