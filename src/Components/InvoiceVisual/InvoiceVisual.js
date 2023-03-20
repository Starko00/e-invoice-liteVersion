import {
  Chip,
  Grid,
  IconButton,
  Paper,
  Skeleton,
  Table,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  TableContainer,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useEffect, useRef, useState } from "react";
import useRpc from "../../Hooks/rpcHooks/useRpc";
import { LoadingAnimation } from "../AuthComponents/LoadingElement/LoadingAnimation";
import CloseIcon from "@mui/icons-material/Close";
import { DeleteForeverRounded, MoreHoriz, Print } from "@mui/icons-material";
import { Box } from "@mui/system";
import QRCode from "react-qr-code";
import ReactToPrint from "react-to-print";
export const InvoiceVisual = ({ displayInvoice }) => {
  const { data, loading, getOneInvoice } = useRpc();
  const [invoice, setInvoice] = useState({});
  const [menuDisplay, setMenuDisplay] = useState(false);
  const invoiceToPrint = useRef()
  useEffect(() => {
    if (displayInvoice !== "") {
      getOneInvoice(displayInvoice);
    }
  }, [displayInvoice]);
  useEffect(() => {
    setInvoice(data?.result?.obj.Result.Invoice);
    console.log(invoice);
  }, [data]);
  return (
    <Grid2
      container
      component={Paper}
      elevation={3}
      sx={{ maxWidth: "950px" }}
      lg={12}
    >
      {menuDisplay ? (
        <Grid2
          container
          lg={12}
          component={Paper}
          collapsedSize={10}
          sx={{
            boxShadow: "0px 4px 4px 2px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Grid2 item>
            <Tooltip>
              <IconButton
                onClick={() => {
                  setMenuDisplay(false);
                  
                }}
              >
                <CloseIcon />
              </IconButton>
            </Tooltip>{" "}
            <Tooltip>
              
                    <IconButton onClick={()=>{console.log(invoiceToPrint.current)}}>
                  
                      <ReactToPrint copyStyles={true} content={()=> invoiceToPrint.current} trigger={()=>{return <Print/>}}/>
                    </IconButton>
                    
            </Tooltip>{" "}
          </Grid2>
          <Grid2 item lg={10}>
            <Tooltip>
              <IconButton
                onClick={() => {
                  console.log(invoice);
                }}
                sx={{
                  bgcolor: "#b43738",
                  color: "white",
                  ":hover": {
                    opacity: 0.85,
                    bgcolor: "#b43738",
                    color: "white",
                  },
                }}
              >
                <DeleteForeverRounded />
              </IconButton>
            </Tooltip>{" "}
            Storno
          </Grid2>
        </Grid2>
      ) : (
        <IconButton
          onClick={() => {
            setMenuDisplay(true);
          }}
        >
          <MoreHoriz />
        </IconButton>
      )}
      {loading || invoice === {} ? (
        <Grid2 container xs={12}>
          <Grid2 item lg={4}>
            <Skeleton variant="rounded" height={118}></Skeleton>
          </Grid2>
          <Grid2 item lg={4}>
            <Skeleton variant="rounded" height={118}></Skeleton>
          </Grid2>
          <Grid2 item lg={4}>
            <Skeleton variant="rounded" height={118}></Skeleton>
          </Grid2>
          <Grid2 item lg={12}>
            <Skeleton variant="rounded" height={35}></Skeleton>
          </Grid2>
          <Grid2 container lg={12}>
            <Grid2 item lg={2}>
              <Skeleton variant="rounded" height={25}></Skeleton>
            </Grid2>
            <Grid2 item lg={10}>
              <Skeleton variant="rounded" height={25}></Skeleton>
            </Grid2>
          </Grid2>
          <Grid2 container lg={12}>
            <Grid2 item lg={2}>
              <Skeleton variant="rounded" height={25}></Skeleton>
            </Grid2>
            <Grid2 item lg={10}>
              <Skeleton variant="rounded" height={25}></Skeleton>
            </Grid2>
          </Grid2>
          <Grid2 container lg={12}>
            <Grid2 item lg={2}>
              <Skeleton variant="rounded" height={25}></Skeleton>
            </Grid2>
            <Grid2 item lg={10}>
              <Skeleton variant="rounded" height={25}></Skeleton>
            </Grid2>
          </Grid2>
          <Grid2 container lg={12}>
            <Grid2 item lg={2}>
              <Skeleton variant="rounded" height={25}></Skeleton>
            </Grid2>
            <Grid2 item lg={10}>
              <Skeleton variant="rounded" height={25}></Skeleton>
            </Grid2>
          </Grid2>
          <Grid2 container lg={12}>
            <Grid2 item lg={2}>
              <Skeleton variant="rounded" height={25}></Skeleton>
            </Grid2>
            <Grid2 item lg={10}>
              <Skeleton variant="rounded" height={25}></Skeleton>
            </Grid2>
          </Grid2>
          <Grid2 item lg={8}>
            <Skeleton variant="rounded" height={300}></Skeleton>
          </Grid2>
          <Grid2 item lg={4}>
            <Skeleton variant="rounded" height={300}></Skeleton>
          </Grid2>
        </Grid2>
      ) : (
        <div  >
         
        <Grid2  ref={invoiceToPrint} container xs={12} sx={{ mt: 1 }} >
          <Grid2 container lg={12}>
            <Grid2
              container
              lg={12}
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <Grid2 container lg={6}>
                <Grid2 item>
                  <Box
                    sx={{
                      width: 150,
                    }}
                  >
                    <img
                      style={{ width: "100%" }}
                      src={`https://e-invoices.online/${invoice?.EU_Invoices?.SellerLogoMap}?inline=true`}
                    />
                  </Box>
                </Grid2>
                <Grid item>
                  <Typography sx={{ fontWeight: 600 }}>
                    {" "}
                    {invoice?.EU_Invoices?.SellerFormalName}{" "}
                  </Typography>
                  <Typography sx={{ fontWeight: 600, fontSize: "14px" }}>
                    PIB: {invoice?.EU_Invoices?.SellerTaxNum}
                  </Typography>
                  <Typography sx={{ fontWeight: 600, fontSize: "14px" }}>
                    PDV:{invoice?.EU_Invoices?.SellerVatNum}
                  </Typography>
                  <Typography sx={{ fontSize: "14px" }}>
                    Email: {invoice?.EU_Invoices?.SellerEmail}
                  </Typography>
                  <Typography sx={{ fontSize: "14px" }}>
                    Adresa: {invoice?.EU_Invoices?.SellerAddress1}{" "}
                    {invoice?.EU_Invoices?.SellerPostCode}{" "}
                    {invoice?.EU_Invoices?.SellerCityName}
                  </Typography>
                  <Typography sx={{ fontSize: "14px" }}>
                    Telefon: {invoice?.EU_Invoices?.SellerTelephone}
                  </Typography>
                </Grid>
              </Grid2>
              <Grid2 container lg={5}>
                {" "}
                <Grid2 item lg={4}>
                  <QRCode
                    style={{ height: "auto", width: "100%" }}
                    value={invoice?.EU_Invoices?.FiscQRContent || "placeholder"}
                  />
                </Grid2>
                <Grid2 item lg={7} sx={{ p: 0 }}>
                  <Typography sx={{ fontSize: "10px" }}>
                    IKOF:{invoice?.EU_Invoices?.FiscCalcNum}
                  </Typography>
                  <Typography sx={{ fontSize: "10px" }}>
                    JIKR:{invoice?.EU_Invoices?.FiscTANum}
                  </Typography>
                  <Typography sx={{ fontSize: "10px" }}>
                    Br racuna:{invoice?.EU_Invoices?.FiscInvNumber}
                  </Typography>
                  <Typography sx={{ fontSize: "10px" }}>
                    Redni br:{invoice?.EU_Invoices?.FiscSerialNum} Mod:
                    {invoice?.EU_Invoices?.FiscServiceMode}
                  </Typography>
                  <Typography sx={{ fontSize: "10px" }}>
                    Vrijeme fisk:{invoice?.EU_Invoices?.FiscMoment}
                  </Typography>
                  <Typography sx={{ fontSize: "10px" }}>
                    Uredjaj:{invoice?.EU_Invoices?.FiscDeviceRegCode}
                  </Typography>
                  <Typography sx={{ fontSize: "10px" }}>
                    Operater:{invoice?.EU_Invoices?.FiscOperatorRegCode}
                  </Typography>
                </Grid2>
              </Grid2>
            </Grid2>
            <Grid2
              container
              lg={12}
              direction="row-reverse"
              justifyContent="space-between"
            >
              <Grid2 item={5}>
                <Paper
                  sx={{ p: 3, backgroundColor: "#white", minHeight: "100%" }}
                >
                  <Typography sx={{ fontSize: "14px", fontWeight: 600, m: 1 }}>
                    BrRac:{" "}
                    <Chip size="small" label={invoice?.EU_Invoices?.InvNum} />
                  </Typography>
                  <Typography sx={{ fontSize: "14px", fontWeight: 600, m: 1 }}>
                    Datum izdavanja:{" "}
                    <Chip
                      size="small"
                      label={invoice?.EU_Invoices?.InvIssueDate}
                    />
                  </Typography>
                  <Typography sx={{ fontSize: "14px", fontWeight: 600, m: 1 }}>
                    Rok placanja:{" "}
                    <Chip
                      size="small"
                      label={invoice?.EU_Invoices?.InvDueDate}
                    />{" "}
                  </Typography>
                  <Typography sx={{ fontSize: "14px", fontWeight: 600, m: 1 }}>
                    Datum isporuke:{" "}
                    <Chip
                      size="small"
                      label={invoice?.EU_Invoices?.InvStartDate}
                    />{" "}
                    -{" "}
                    <Chip
                      size="small"
                      label={invoice?.EU_Invoices?.InvEndDate}
                    />{" "}
                  </Typography>
                  <Typography sx={{ fontSize: "14px", fontWeight: 600, m: 1 }}>
                    Ponuda:{" "}
                    <Chip
                      size="small"
                      label={invoice?.EU_Invoices?.BuyerOrderRef}
                    />{" "}
                  </Typography>
                </Paper>
              </Grid2>
              <Grid2 lg={5}>
                <Paper
                  sx={{
                    p: 3,

                    color: "#2f4365",
                    minHeight: "100%",
                  }}
                >
                  <Typography variant="h5" sx={{ color: "#2f4365" }}>
                    Kupac
                  </Typography>
                  <Typography sx={{ fontSize: "15px" }}>
                    Naziv: {invoice?.EU_Invoices?.BuyerFormalName}
                  </Typography>
                  <Typography sx={{ fontSize: "15px" }}>
                    Adresa: {invoice?.EU_Invoices?.BuyerAddress1}{" "}
                    {invoice?.EU_Invoices?.BuyerPostCode}{" "}
                    {invoice?.EU_Invoices?.BuyerCityName}
                  </Typography>
                  <Typography sx={{ fontSize: "15px" }}>
                    PIB: {invoice?.EU_Invoices?.BuyerTaxNum}
                  </Typography>
                  <Typography sx={{ fontSize: "15px" }}>
                    PDV: {invoice?.EU_Invoices?.BuyerVatNum}
                  </Typography>
                </Paper>
              </Grid2>
            </Grid2>
            <Grid2 container lg={12} sx={{ color: "#2f4365" }}>
              <Grid2 item lg={12}>
                <Typography variant="h5">Stavke:</Typography>
              </Grid2>
              <TableContainer lg={12}>
                <Table
                  size="small"
                  aria-label="a dense table"
                  sx={{ maxWidth: "900px" }}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>
                        Naziv stavke
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Kolicina</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>JM</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>
                        Cijena sa PDV
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>% Rabat</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>% PDV</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>
                        Cena bez PDV
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>
                        Iznos bez PDV
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Iznos PDV</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>
                        Iznos sa PDV
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  {invoice?.EU_Invoices?._details.EU_Invoices_Items?.map(
                    (item) => {
                      return (
                        <TableRow>
                          <TableCell sx={{ fontSize: "12px" }}>
                            {item.ItemName}
                          </TableCell>
                          <TableCell sx={{ fontSize: "12px" }}>
                            {item.Quantity}
                          </TableCell>
                          <TableCell sx={{ fontSize: "12px" }}>
                            {item.UMCodeNameSC__CodeFiscal}
                          </TableCell>
                          <TableCell sx={{ fontSize: "12px" }}>
                            {item.ItemRetailPrice}
                          </TableCell>
                          <TableCell sx={{ fontSize: "12px" }}>
                            {item.LineAllowPercent}
                          </TableCell>
                          <TableCell sx={{ fontSize: "12px" }}>
                            {item.ItemVatCodeSC__Rate}
                          </TableCell>
                          <TableCell sx={{ fontSize: "12px" }}>
                            {item.ItemNetPrice}
                          </TableCell>
                          <TableCell sx={{ fontSize: "12px" }}>
                            {item.LineNetAmount}
                          </TableCell>
                          <TableCell sx={{ fontSize: "12px" }}>
                            {item.LineTotalVatAmount}
                          </TableCell>
                          <TableCell sx={{ fontSize: "12px" }}>
                            {item.LineNetAmountInclVat}
                          </TableCell>
                        </TableRow>
                      );
                    }
                  )}
                </Table>
              </TableContainer>
            </Grid2>
            <Grid2 container lg={12} sx={{ mt: 3 }}>
              <Grid2 itme lg={7}>
                <TableContainer component={Paper} lg={12}>
                  <Table
                    size="small"
                    aria-label="a dense table"
                    sx={{ maxWidth: "900px" }}
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600 }}>
                          Poreska stopa
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>
                          Br stavki
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>
                          Poreska osnovica
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>
                          Iznos poreza
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    {invoice?.EU_Invoices?._details?.EU_Invoices_VatsUI?.map(
                      (item) => {
                        return (
                          <TableRow>
                            <TableCell>{item.VatCodeUI}</TableCell>
                            <TableCell>{item.NumOfItems}</TableCell>
                            <TableCell>{item.VatInvAllowBaseAmount}</TableCell>
                            <TableCell>{item.VatRate}</TableCell>
                          </TableRow>
                        );
                      }
                    )}
                  </Table>
                </TableContainer>
              </Grid2>

              <Grid2 container alignItems={"flex-end"} lg={5} sx={{ gap: 0 }}>
                <Grid2 container lg={12}>
                  <Grid2 item lg={8}>
                    <Typography>Neto iznos stavki</Typography>
                  </Grid2>
                  <Grid2 item lg={4}>
                    <Typography>
                      {invoice?.EU_Invoices?.InvBaseAmountMap}
                    </Typography>
                  </Grid2>
                </Grid2>
                <Grid2 container lg={12}>
                  <Grid2 item lg={8}>
                    <Typography>Ukupan iznos bez PDV</Typography>
                  </Grid2>
                  <Grid2 item lg={4}>
                    <Typography>
                      {invoice?.EU_Invoices?.InvAmountExclVat}
                    </Typography>
                  </Grid2>
                </Grid2>
                <Grid2 container lg={12}>
                  <Grid2 item lg={8}>
                    <Typography>Ukupan iznos PDV</Typography>
                  </Grid2>
                  <Grid2 item lg={4}>
                    <Typography>
                      {invoice?.EU_Invoices?.InvTotalVatAmountCC}
                    </Typography>
                  </Grid2>
                </Grid2>
                <Grid2 container lg={12}>
                  <Grid2 item lg={8}>
                    <Typography sx={{ fontWeight: 600 }}>
                      Ukupan za placanje (
                      {invoice?.EU_Invoices?.InvCurrencyCode})
                    </Typography>
                  </Grid2>
                  <Grid2 item lg={4}>
                    <Typography sx={{ fontWeight: 600 }}>
                      {invoice?.EU_Invoices?.InvPayableAmount}
                    </Typography>
                  </Grid2>
                </Grid2>
              </Grid2>
            </Grid2>
          </Grid2>
        </Grid2>
        </div>
      )}
    </Grid2>
    
  );
};
