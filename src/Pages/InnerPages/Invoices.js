import {
  Grid,
  Paper,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Table,
  Button,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { LoadingAnimation } from "../../Components/AuthComponents/LoadingElement/LoadingAnimation";
import { InvoiceVisual } from "../../Components/InvoiceVisual/InvoiceVisual";
import useRpc from "../../Hooks/rpcHooks/useRpc";
import InvoicesStyle from "./InvoicesStyle.module.css";
export const Invoices = () => {
  const { getInvoicesFromPreparation, data, loading } = useRpc();
  const [invoicesList, setInvoicesList] = useState([]);
  const [displayInvoice, setDisplayInvoice] = useState("");
  useEffect(() => {
    getInvoicesFromPreparation(0, 51);
  }, []);
  useEffect(() => {
    if (data?.result.data) {
      if (invoicesList.length !== 0 && invoicesList.length >= 51) {
        setInvoicesList([...invoicesList, ...data.result.data]);
      } else {
        if (invoicesList.length === 0) {
          setInvoicesList(data.result.data);
        }
      }
    }
  }, [data?.result.data]);
  const [scrollerPosition, setScrollerPosition] = useState(0);
  const [skip, setSkip] = useState(50);
  const style = InvoicesStyle;
  return (
    <Grid2
      container
      spacing={2}
      justifyContent={"space-around"}
      
      sx={{
        m: { lg: 1, md: 1, xs: 0.5 },
      }}
    >
      <Grid2 item lg={5} md={6} xs={12}>
        {loading || data ? (
          <TableContainer
            component={Paper}
            onScroll={(e) => {
              if (
                e.target.scrollTop > 700 &&
                e.target.scrollTop > scrollerPosition + 700 &&
                invoicesList.length < data.result.count
              ) {
                setScrollerPosition(() => {
                  if (e.target.scrollTop > scrollerPosition + 700) {
                    return e.target.scrollTop;
                  } else return scrollerPosition;
                });

                getInvoicesFromPreparation(invoicesList.length, 51);

                setSkip(() => {
                  return skip + 51;
                });
              }
            }}
            sx={{
              maxHeight: { lg: 800, md: 600, xs: 400 },
            }}
          >
            <Table
              stickyHeader
              sx={{ minWidth: 1 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow
                  sx={{
                    boxShadow: "0px 4px 4px 2px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      display: { md: "none", xs: "none", lg: "table-cell" },
                    }}
                  >
                    Country
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      display: {
                        md: "table-cell",
                        xs: "none",
                        lg: "table-cell",
                      },
                    }}
                  >
                    Tip
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    Name
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      display: { md: "none", xs: "none", lg: "table-cell" },
                    }}
                  >
                    Rok
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    Izdato
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    Iznos
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    Status
                  </TableCell>
                </TableRow>
              </TableHead>

              {invoicesList.map((invoice) => {
                return (
                  <TableRow
                    onClick={() => {
                      console.log(invoice.Id);
                      setDisplayInvoice(invoice.Id);
                    }}
                    key={invoice.Id}
                    sx={{
                      ":hover": {
                        bgcolor: "#23367c",
                        color: "white",
                        cursor: "pointer",
                      },
                    }}
                  >
                    <TableCell
                      align="center"
                      sx={{
                        display: { md: "none", xs: "none", lg: "table-cell" },
                      }}
                    >
                      {invoice.BuyerCounCode}
                    </TableCell>
                    <TableCell
                      sx={{
                        display: {
                          md: "table-cell",
                          xs: "none",
                          lg: "table-cell",
                        },
                      }}
                    >
                      {invoice.InvTypeCodeNameSC__CodeName}
                    </TableCell>
                    <TableCell
                      className={style.itemName}
                      sx={{
                        maxWidth: "150px",

                        whitSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {invoice.BuyerFormalName}
                    </TableCell>
                    <TableCell
                      sx={{
                        display: { md: "none", xs: "none", lg: "table-cell" },
                      }}
                    >
                      {invoice.InvDueDate}
                    </TableCell>
                    <TableCell align="center">
                      {invoice?.InvIssueDate?.split("T")[0]}
                    </TableCell>
                    <TableCell align="center">
                      {invoice.InvAmountInclVat}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ alignItems: "center", justifyContent: "center" }}
                    >
                      <div
                        data-status={invoice.StepStatus}
                        className={style.status}
                      ></div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </Table>
          </TableContainer>
        ) : (
          <LoadingAnimation />
        )}
      </Grid2>
      <Grid2
        item
        lg={7}
        md={6}
        xs={12}
        component={Paper}
        elevation={2}
        
        sx={{ p: 2, maxWidth:"950px" }}
      >
        <InvoiceVisual displayInvoice={displayInvoice}></InvoiceVisual>
      </Grid2>
    </Grid2>
  );
};
