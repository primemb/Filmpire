import { Box, Button, styled, Typography } from "@mui/material";

interface IPaginationProps {
  totalPage: number;
  page: number;
  setPage: (page: number) => void;
}

const PageButton = styled(Button)({
  margin: "30px 2px",
});

const Pagination = ({ totalPage, page, setPage }: IPaginationProps) => {
  const handlePrev = () => {
    const prevPage = page - 1;
    if (prevPage < 1) return;
    setPage(prevPage);
  };

  const handleNext = () => {
    const nextPage = page + 1;
    if (nextPage > totalPage) return;
    setPage(nextPage);
  };

  if (totalPage === 0) return null;

  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <PageButton
        onClick={handlePrev}
        variant="contained"
        color="primary"
        type="button"
      >
        Prev
      </PageButton>
      <Typography
        variant="h4"
        sx={{ margin: "0 20px", color: (theme) => theme.palette.text.primary }}
      >
        {page}
      </Typography>
      <PageButton
        onClick={handleNext}
        variant="contained"
        color="primary"
        type="button"
      >
        Next
      </PageButton>
    </Box>
  );
};

export default Pagination;
