import { useEffect, useState } from "react";

interface StateManagerProps {
  byUrlQuery?: boolean
  updatePath: (param: string) => void
}

const useTableStateManager = (params: StateManagerProps) => {
  const { byUrlQuery, updatePath } = params
  const [page, setPage] = useState(1)
  const [sortedBy, setSortedBy] = useState(['', 'asc'])
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    if (byUrlQuery) {
      const currentPageUrl = document.URL;
      const url = new URL(currentPageUrl);
      const sortBy = String(url.searchParams.get('sortBy'));
      const order = String(url.searchParams.get('order'));
      const page = Number(url.searchParams.get('page'));
      const search = String(url.searchParams.get('search'));

      setSortedBy([sortBy, order])
      setPage(page == 0 ? 1 : page)
      setSearchText(search)
      
    }
  }, [byUrlQuery]);

  const changePage = (p: number) => {

    setPage(p > 0 ? p : 1)
    if (byUrlQuery) updateUrlQueries([['page', p]])
  }

  const changeSortedBy = (key: string, order: 'asc' | 'desc') => {
    setSortedBy([key, order])
    if (byUrlQuery) updateUrlQueries([['sortBy', key], ['order', order]])
  }

  const changeSearchText = (text: string) => {
    setSearchText(text)
    if (byUrlQuery) updateUrlQueries([['search', text]])
  }

  const updateUrlQueries = (data: Array<[string, any]>) => {
    let queryParams = new URLSearchParams(window.location.search);
    data.forEach(e => queryParams.set(e[0], String(e[1])))
    window.history.replaceState(null, '', '?' + queryParams.toString());
    updatePath(queryParams.toString());
  }

  return {
    page, sortedBy, searchText,
    changePage, changeSortedBy, changeSearchText,
  };
};

export default useTableStateManager;