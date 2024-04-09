import {
  Button,
  ButtonGroup,
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

interface Props {
  paintings: Painting[];
  selectedPaintings: number[];
  setSelectedPaintings: (ids: number[]) => void;
  viewPainting: (id: number) => void;
  editPainting: (id: number) => void;
  deletePaintings: (ids: number[]) => void;
}

export default function PaintingsTableComponent(props: Props) {
  const {
    paintings,
    selectedPaintings,
    setSelectedPaintings,
    viewPainting,
    editPainting,
    deletePaintings,
  } = props;

  if (selectedPaintings.some((id) => !paintings.some((p) => p.id === id))) {
    setSelectedPaintings(
      selectedPaintings.filter((id) => paintings.some((p) => p.id === id))
    );
  }

  return (
    <TableContainer component={Paper} style={{ maxHeight: "70vh" }}>
      <Table>
        <TableHead
          sx={{
            "& .MuiTableCell-root": { fontWeight: "bold", fontSize: "1em" },
          }}
        >
          <TableRow>
            <TableCell>
              <Checkbox
                checked={selectedPaintings.length === paintings.length}
                indeterminate={
                  selectedPaintings.length > 0 &&
                  selectedPaintings.length < paintings.length
                }
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedPaintings(paintings.map((p) => p.id));
                  } else {
                    setSelectedPaintings([]);
                  }
                }}
              />
            </TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Year</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paintings.map((p) => (
            <TableRow key={p.id}>
              <TableCell>
                <Checkbox
                  checked={selectedPaintings.includes(p.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedPaintings([...selectedPaintings, p.id]);
                    } else {
                      setSelectedPaintings(
                        selectedPaintings.filter((id) => id !== p.id)
                      );
                    }
                  }}
                />
              </TableCell>
              <TableCell>{p.name}</TableCell>
              <TableCell>{p.description}</TableCell>
              <TableCell>{p.year}</TableCell>
              <TableCell>
                <ButtonGroup variant="contained" size="small">
                  <Button onClick={() => deletePaintings([p.id])}>
                    Delete
                  </Button>
                  <Button onClick={() => editPainting(p.id)}>Edit</Button>
                  <Button onClick={() => viewPainting(p.id)}>View</Button>
                </ButtonGroup>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
