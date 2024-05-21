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
  painters: Painter[];
  selectedPainters: number[];
  setSelectedPainters: (ids: number[]) => void;
  viewPainter: (id: number) => void;
  editPainter: (id: number) => void;
  deletePainters: (ids: number[]) => void;
}

export default function PaintersTableComponent({
  painters,
  selectedPainters,
  setSelectedPainters,
  viewPainter,
  editPainter,
  deletePainters,
}: Props) {
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
                checked={selectedPainters.length === painters.length}
                indeterminate={
                  selectedPainters.length > 0 &&
                  selectedPainters.length < painters.length
                }
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedPainters(painters.map((p) => p.id));
                  } else {
                    setSelectedPainters([]);
                  }
                }}
              />
            </TableCell>
            <TableCell>Name</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {painters.map((p) => (
            <TableRow key={p.id}>
              <TableCell>
                <Checkbox
                  checked={selectedPainters.includes(p.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedPainters([...selectedPainters, p.id]);
                    } else {
                      setSelectedPainters(
                        selectedPainters.filter((id) => id !== p.id)
                      );
                    }
                  }}
                />
              </TableCell>
              <TableCell>{p.name}</TableCell>
              <TableCell align="right">
                <ButtonGroup variant="contained" size="small">
                  <Button onClick={() => deletePainters([p.id])}>Delete</Button>
                  <Button onClick={() => editPainter(p.id)}>Edit</Button>
                  <Button onClick={() => viewPainter(p.id)}>View</Button>
                </ButtonGroup>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
