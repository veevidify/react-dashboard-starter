import React, { useState, useEffect } from 'react';
import { DataTable, Box, Text, Button, TextInput, Select } from 'grommet';
import { ChevronLeft, ChevronRight } from './Icons';
import { intArr } from '../utils/functions';

const PaginatedTable: React.FC<GObject> = props => {
  const { pageSize, data } = props;

  const [currentPage, changeCurrentPage] = useState(0);
  const [currentPageSize, changeCurrentPageSize] = useState(pageSize);
  const [renderedData, updateRenderedData] = useState(data.slice(0, pageSize));
  // const currentPageSize = pageSize

  const totalPage = Math.floor(data.length / currentPageSize) + 1;
  useEffect(() => {
    updateRenderedData(
      data.slice(currentPage * currentPageSize, currentPage * currentPageSize + currentPageSize),
    );
  }, [currentPage, currentPageSize, data]);

  return (
    <Box gap="small" pad={{ horizontal: 'medium' }}>
      <DataTable {...props} data={[...renderedData]} />

      {/* controls */}
      <Box direction="row" justify="between" border="top" pad="small">
        <Button
          plain
          icon={<ChevronLeft />}
          label="Prev"
          onClick={() => {
            changeCurrentPage(currentPage - 1 >= 0 ? currentPage - 1 : 0);
          }}
        >
          Prev
        </Button>
        <Box gap="small">
          <Box direction="row" justify="start" gap="small">
            <Box alignContent="center" alignSelf="center" width="20%">
              <Text>Per page:</Text>
            </Box>
            <Box width="20%">
              <TextInput
                value={currentPageSize}
                onChange={e => changeCurrentPageSize(e.target.value)}
              />
            </Box>
            <Box alignContent="center" alignSelf="center">
              <Text>
                {Math.min(currentPage * currentPageSize + 1, data.length)} -{' '}
                {Math.min(currentPage * currentPageSize + currentPageSize, data.length)} of{' '}
                {data.length} records
              </Text>
            </Box>
          </Box>
          <Box direction="row" justify="start" gap="small">
            <Box alignContent="center" alignSelf="center" width="20%">
              <Text>Page:</Text>
            </Box>
            <Box width="20%">
              <Select
                valueLabel={<Box pad="small">{currentPage + 1}</Box>}
                options={intArr(totalPage).map(i => (i + 1).toString())}
                onChange={e => changeCurrentPage(e.value - 1)}
              />
            </Box>
            <Box alignContent="center" alignSelf="center" width="10%">
              <Text>/ {totalPage}</Text>
            </Box>
          </Box>
        </Box>
        <Button
          plain
          reverse
          icon={<ChevronRight />}
          label="Next"
          onClick={() => {
            changeCurrentPage(currentPage + 1 >= totalPage - 1 ? totalPage - 1 : currentPage + 1);
          }}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default PaginatedTable;
