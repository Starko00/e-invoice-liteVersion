import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import useRpc from "../../Hooks/rpcHooks/useRpc";
import InvoiceEditorStyle from "./InvoiceEditorStyle.module.css";
import {
  BsFillCheckCircleFill,
  BsFillExclamationCircleFill,
  BsFillPlusSquareFill,
  BsFillXSquareFill,
} from "react-icons/bs";
import { SearchResoult } from "./InvoiceEditorInnerComponent/SearchResoult";
import { LoadingAnimation } from "../AuthComponents/LoadingElement/LoadingAnimation";
export const InvoiceEditor = ({ props, resetInvoiceEditor }) => {
  // Invoice editor style
  const style = InvoiceEditorStyle;
  useEffect(() => {
    if (props === null || props === undefined) {
      console.log("Ne moze");
    }
  }, [props]);
  // Current user info from global state
  const [user] = useContext(UserContext);
  const currentDate = new Date(Date.now());
  // Invoice owner info from backend
  const { data, invoiceSaveResponse, loading, getInvoOwnerInfo, saveInvoice } =
    useRpc();

  // Articles array
  const [articles, setArticles] = useState([]);

  const [BuyerOrderRef, setBuyerOrderRef] = useState();

  // Article object requirements
  const [ItemName, setItemName] = useState(
    props.Invoice.EU_Invoices._details.EU_Invoices_Items[0].ItemName
  );
  const [Quantity, setQuantity] = useState(
    props.Invoice.EU_Invoices._details.EU_Invoices_Items[0].Quantity
  );
  const [UMCodeNameSC__Code, setUMCodeNameSC__Code] = useState(
    props.Invoice.EU_Invoices._details.EU_Invoices_Items[0].UMCodeNameSC__Code
  );
  const [ItemNetPrice, setItemNetPrice] = useState(
    props.Invoice.EU_Invoices._details.EU_Invoices_Items[0].ItemNetPrice
  );
  const [ItemVatCodeSC__VatCode, setItemVatCodeSC__VatCode] = useState(
    props.Invoice.EU_Invoices._details.EU_Invoices_Items[0]
      .ItemVatCodeSC__VatCode
  );
  const [ItemSellerIdent, setItemSellerIdent] = useState(
    props.Invoice.EU_Invoices._details.EU_Invoices_Items[0].ItemSellerIdent
  );
  const [LineExciseAmount, setLineExciseAmount] = useState(
    props.Invoice.EU_Invoices._details.EU_Invoices_Items[0].LineExciseAmount
  );
  const [LineAllowPercent, setLineAllowPercent] = useState(
    props.Invoice.EU_Invoices._details.EU_Invoices_Items[0].LineAllowPercent
  );
  const [ItemDesc, setItemDesc] = useState(
    props.Invoice.EU_Invoices._details.EU_Invoices_Items[0].ItemDesc
  );
  const [ItemBuyerIdent, setItemBuyerIdent] = useState(
    props.Invoice.EU_Invoices._details.EU_Invoices_Items[0].ItemBuyerIdent
  );
  const [ItemStandIdent, setItemStandIdent] = useState(
    props.Invoice.EU_Invoices._details.EU_Invoices_Items[0].ItemStandIdent
  );
  const [ItemStandIdentSchID, setItemStandIdentSchID] = useState(
    props.Invoice.EU_Invoices._details.EU_Invoices_Items[0].ItemStandIdentSchID
  );
  const [ItemRetailPriceInp, setItemRetailPriceInp] = useState(
    props.Invoice.EU_Invoices._details.EU_Invoices_Items[0].ItemRetailPriceInp
  );
  const [ItemVatCodeSC, setItemVatCodeSC] = useState(
    props.Invoice.EU_Invoices._details.EU_Invoices_Items[0].ItemVatCodeSC
  );
  const inputFunction = (key, value) => {
    props.Invoice.EU_Invoices[key] = value;
  }; //Filles in the invoice object

  // Inovice calculation inportant
  const [ammountWithoutPDV, setAmmountWithoutPDV] = useState(0);
  const [totalAmmountOfPDV, setTotalAmmountOfPDV] = useState(0);
  // Invoice buyer search
  const [buyerSearch, setBuyerSearch] = useState();
  const [searchBuyerResult, setSearchBuyerResult] = useState("");

  // Buyer auto fill
  const [BuyerFormalName, setBuyerFormalName] = useState("");
  const [BuyerCity, setBuyerCity] = useState("");
  const [BuyerAddress, setAddress] = useState("");
  const [BuyerPostCode, setBuyerPostCode] = useState("");
  const [BuyerTaxNum, setBuyerTaxNum] = useState("");
  const [BuyerRegNum, setBuyerRegNum] = useState("");
  const [BuyerVatNum, setBuyerVatNum] = useState("");
  const [BuyerIDNum, setBuyerIDNum] = useState("");
  useEffect(() => {
    if (buyerSearch !== "") {
      for (const [key, value] of Object.entries(searchBuyerResult)) {
        props.Invoice.EU_Invoices["Buyer" + key] = value;
        if (key === "City") {
          props.Invoice.EU_Invoices["Buyer" + key + "Name"] = value;
        }
        if (key === "Address") {
          props.Invoice.EU_Invoices["Buyer" + key + "1"] = value;
        }

        setBuyerFormalName(props.Invoice.EU_Invoices["BuyerFormalName"]);
        setBuyerCity(props.Invoice.EU_Invoices["BuyerCity"]);
        setAddress(props.Invoice.EU_Invoices["BuyerAddress1"]);
        setBuyerPostCode(props.Invoice.EU_Invoices["BuyerPostCode"]);
        setBuyerTaxNum(props.Invoice.EU_Invoices["BuyerTaxNum"]);
        setBuyerRegNum(props.Invoice.EU_Invoices["BuyerRegNum"]);
        setBuyerVatNum(props.Invoice.EU_Invoices["BuyerVatNum"]);
        setBuyerIDNum(props.Invoice.EU_Invoices["BuyerIDNum"]);
      }
    }
  }, [searchBuyerResult]);
  const [calculations, setCalculations] = useState(0);
  useEffect(() => {
    getInvoOwnerInfo(); //Invoice owner info will be changed based on the current active user and primary organization from the Rpc Object
  }, [user]);
  useEffect(() => {
    props.Invoice.EU_Invoices.InvAmountInclVatInp =
      ammountWithoutPDV + totalAmmountOfPDV;
    props.Invoice.EU_Invoices.InvTotalVatAmountCCInp = totalAmmountOfPDV;
    props.Invoice.EU_Invoices._details.EU_Invoices_PaymentInstrs[0].PaymentAmount =
      ammountWithoutPDV + totalAmmountOfPDV;
  }, [calculations]);
  const calculateAll = () => {

    let articleSum = 0;
    let pdvSumV2 = 0;
    articles.map((article) => {
      articleSum = articleSum+ Number(article.ItemNetPrice) * Number(article.Quantity);
      pdvSumV2 = pdvSumV2+
        Number(article.ItemNetPrice) *
        Number(article.Quantity) *
        (Number(article.Rate) / 100);
    });
    console.log(articleSum, pdvSumV2) 
    setTotalAmmountOfPDV(pdvSumV2);
    setAmmountWithoutPDV(articleSum);
    setCalculations(calculations + 1);
  };

  useEffect(() => {
    console.log(articles);
    calculateAll();
  }, [articles]); //Calls the callculation function when a new article has been added

  const addNewArticle = () => {
    setArticles((articles) => [
      ...articles,
      {
        ItemName: ItemName,
        Quantity: Number(Quantity),
        ItemNetPrice: Number(ItemNetPrice),
        UMCodeNameSC__Code,
        ...ItemVatCodeSC__VatCode,
        // ItemVatCodeSC,
        ItemVatCodeSC__VatCode: ItemVatCodeSC__VatCode.VatCode,
        ItemSellerIdent,
        LineExciseAmount,
        LineAllowPercent,
        ItemDesc,
        ItemBuyerIdent,
        ItemStandIdent,
        ItemStandIdentSchID,
        ItemRetailPriceInp,
      },
    ]);
 
  }; //Adds a new article to the object that has been initialized

  const removeArticle = (item) => {
    setArticles((articles) => [
      ...articles.filter((article) => {
        return articles.indexOf(article) !== articles.indexOf(item);
      }),
    ]);
    
  }; //Removes an article object from articles array

  useEffect(() => {
    if (invoiceSaveResponse) {
      console.log(invoiceSaveResponse);
    }
  }, [invoiceSaveResponse]); //Logs the invoiceSaveResponse back to the client when it's aveable
  const [invoiceValidationWarrning, setInvoiceValidationWarrning] =
    useState(false);

  const invoiceValidation = () => {
    let validation = false;
    let checker = [];
    for (const invItemKey in props.Invoice.EU_Invoices) {
      if (
        props.JSONSchema.properties.EU_Invoices.required.includes(invItemKey)
      ) {
        if (props.Invoice.EU_Invoices[invItemKey] === null) {
          checker = [...checker, invItemKey];
        }
      }
    }
    if (checker.length === 0 && articles.length > 0) {
      validation = true;
      return { status: true, required: [...checker] };
    } else {
      setInvoiceValidationWarrning(true);
      setTimeout(() => setInvoiceValidationWarrning(false), 3000);
      return { status: false, required: [...checker] };
    }
  }; //Validates if all the required fields that must  be submited

  useEffect(() => {
    if (invoiceSaveResponse) {
      console.log(invoiceSaveResponse.data.result.Status, "Use effect hook");
    }
  }, [invoiceSaveResponse]);

  const invoiceSaveProcedure = (steps = [35]) => {
    console.log(invoiceValidation());
    if (invoiceValidation().status === true) {
      props.Invoice.EU_Invoices._details.EU_Invoices_Items = articles;
      console.log("Faktura sacuvana");
      saveInvoice(props.Invoice, steps);
      return;
    }
    console.log("Invoice has miisng fields");
    return;
  }; //Alerts the user about the status of all required fields
  const vatInvoice = [
    {
      Rate: 0,
      VatCodeUI: "Izuzeće od PDV",
      VatCode: "VAT_CL30",
      VatCodeDesc: "(Oslobođeno) Posebna oslobođenja.",
      VCCode_EN16931: "E",
      GroupUIVatCode: "Izuzeće",
      GroupFiscVatCode: "VAT_CL30",
      VERCode: null,
      VERDesc:
        "Oslobođeno PDV-a prema čl. 30. Zakona o PDV-u. Posebna oslobođenja.",
      VCCode_EN16931__Name: "Exempt from Tax ",
      Id: "1e4005ff-276e-11ec-8145-d2b2cff0e6ca",
    },
    {
      Rate: 0,
      VatCodeUI: "Mali obveznici",
      VatCode: " ",
      VatCodeDesc: "Mali obveznici",
      VCCode_EN16931: "O",
      GroupUIVatCode: "Mali obveznici",
      GroupFiscVatCode: "MALIOBV",
      VERCode: null,
      VERDesc: "PDV nije obračunat (Mali obveznici - čl. 42. Zakona o PDV-u).",
      VCCode_EN16931__Name: "Services outside scope of tax ",
      Id: "2eae0907-715f-11ed-9102-c49e7815da59",
    },
    {
      Rate: 0,
      VatCodeUI: "Izuzeće od PDV",
      VatCode: "VAT_CL26",
      VatCodeDesc: "(Oslobođeno) Oslobođenja od javnog interesa.",
      VCCode_EN16931: "E",
      GroupUIVatCode: "Izuzeće",
      GroupFiscVatCode: "VAT_CL26",
      VERCode: null,
      VERDesc:
        "Oslobođeno PDV-a prema čl. 26. Zakona o PDV-u. Oslobođenja od javnog interesa.",
      VCCode_EN16931__Name: "Exempt from Tax ",
      Id: "07aa3972-276e-11ec-8145-d2b2cff0e6ca",
    },
    {
      Rate: 0,
      VatCodeUI: "Izuzeće od PDV",
      VatCode: "VAT_CL27",
      VatCodeDesc: "(Oslobođeno) Ostala oslobođenja.",
      VCCode_EN16931: "E",
      GroupUIVatCode: "Izuzeće",
      GroupFiscVatCode: "VAT_CL27",
      VERCode: null,
      VERDesc:
        "Oslobođeno PDV-a prema čl. 27. Zakona o PDV-u. Ostala oslobođenja.",
      VCCode_EN16931__Name: "Exempt from Tax ",
      Id: "0ff25cba-276e-11ec-8145-d2b2cff0e6ca",
    },
    {
      Rate: 0,
      VatCodeUI: "Izuzeće od PDV",
      VatCode: "VAT_CL28",
      VatCodeDesc: "(Oslobođeno) Oslobođenja kod uvoza proizvoda.",
      VCCode_EN16931: "E",
      GroupUIVatCode: "Izuzeće",
      GroupFiscVatCode: "VAT_CL28",
      VERCode: null,
      VERDesc:
        "Oslobođeno PDV-a prema čl. 28. Zakona o PDV-u.Oslobođenja kod uvoza proizvoda.",
      VCCode_EN16931__Name: "Exempt from Tax ",
      Id: "174c1571-276e-11ec-8145-d2b2cff0e6ca",
    },
    {
      Rate: 0,
      VatCodeUI: "Izuzeće od PDV",
      VatCode: "VAT_CL29",
      VatCodeDesc: "(Oslobođeno) Oslobođenja kod privremenog uvoza proizvoda.",
      VCCode_EN16931: "E",
      GroupUIVatCode: "Izuzeće",
      GroupFiscVatCode: "VAT_CL29",
      VERCode: null,
      VERDesc:
        "Oslobođeno PDV-a prema čl. 29. Zakona o PDV-u. Oslobođenja kod privremenog uvoza proizvoda.",
      VCCode_EN16931__Name: "Exempt from Tax ",
      Id: "1e4005fe-276e-11ec-8145-d2b2cff0e6ca",
    },
    {
      Rate: 0,
      VatCodeUI: "Izuzeće od PDV",
      VatCode: "VAT_CL17",
      VatCodeDesc: "(Oslobođeno) Mjesto prometa usluga.",
      VCCode_EN16931: "E",
      GroupUIVatCode: "Izuzeće",
      GroupFiscVatCode: "VAT_CL17",
      VERCode: null,
      VERDesc:
        "Oslobođeno PDV-a prema čl. 17. st. 4. Zakona o PDV-u. Mjesto prometa usluga.",
      VCCode_EN16931__Name: "Exempt from Tax ",
      Id: "3dec09b1-25a9-11ec-8145-d2b2cff0e6ca",
    },
    {
      Rate: 21,
      VatCodeUI: "Opšta - 21",
      VatCode: "21",
      VatCodeDesc: "Opšta stopa 21%",
      VCCode_EN16931: "S",
      GroupUIVatCode: "21",
      GroupFiscVatCode: "21.00",
      VERCode: null,
      VERDesc: null,
      VCCode_EN16931__Name: "Standard rate",
      Id: "3dec09b2-25a9-11ec-8145-d2b2cff0e6ca",
    },
    {
      Rate: 7,
      VatCodeUI: "Snižena - 7",
      VatCode: "7",
      VatCodeDesc: "Snižena stopa 7%",
      VCCode_EN16931: "S",
      GroupUIVatCode: "7",
      GroupFiscVatCode: "7.00",
      VERCode: null,
      VERDesc: null,
      VCCode_EN16931__Name: "Standard rate",
      Id: "3dec09b3-25a9-11ec-8145-d2b2cff0e6ca",
    },
    {
      Rate: 0,
      VatCodeUI: "Nulta - 0",
      VatCode: "0",
      VatCodeDesc: "(Oslobođeno) Nulta stopa.",
      VCCode_EN16931: "Z",
      GroupUIVatCode: "0",
      GroupFiscVatCode: "0.00",
      VERCode: null,
      VERDesc: null,
      VCCode_EN16931__Name: "Zero rated goods ",
      Id: "3dec09b4-25a9-11ec-8145-d2b2cff0e6ca",
    },
    {
      Rate: 0,
      VatCodeUI: "Izuzeće od PDV",
      VatCode: "VAT_CL44",
      VatCodeDesc: "(Oslobođeno) Usluge putničkih agencija.",
      VCCode_EN16931: "E",
      GroupUIVatCode: "Izuzeće",
      GroupFiscVatCode: "VAT_CL44",
      VERCode: null,
      VERDesc:
        "Oslobođeno PDV-a prema čl. 44. Zakona o PDV-u. Usluge putničkih agencija.",
      VCCode_EN16931__Name: "Exempt from Tax ",
      Id: "3dec09b6-25a9-11ec-8145-d2b2cff0e6ca",
    },
    {
      Rate: 0,
      VatCodeUI: "Nulta - 0",
      VatCode: "0-Export",
      VatCodeDesc: "Oslobođen izvoz 0%",
      VCCode_EN16931: "Z",
      GroupUIVatCode: "0",
      GroupFiscVatCode: "0.00",
      VERCode: null,
      VERDesc: "Oslobođen izvoz 0%",
      VCCode_EN16931__Name: "Zero rated goods ",
      Id: "47cb4848-276e-11ec-8145-d2b2cff0e6ca",
    },
    {
      Rate: 0,
      VatCodeUI: "Izuzeće od PDV",
      VatCode: "VAT_CL20",
      VatCodeDesc: "(Oslobođeno) Poreska osnovica i ispravka poreske osnovice.",
      VCCode_EN16931: "E",
      GroupUIVatCode: "Izuzeće",
      GroupFiscVatCode: "VAT_CL20",
      VERCode: null,
      VERDesc:
        "Oslobođeno PDV-a prema čl. 20. Zakona o PDV-u. Poreska osnovica i ispravka poreske osnovice.",
      VCCode_EN16931__Name: "Exempt from Tax ",
      Id: "a6904ee2-276e-11ec-8145-d2b2cff0e6ca",
    },
  ];
  return (
    // Main invoice editors
    <div className={style.mainContainer}>
      {/* Seller container */}
      <div className={style.sellerContainer}>
        {/* Owner data */}
        <div className={style.invoiceSellerData}>
          <div>
            <h4>Izdavalac fakture:</h4>
            <p>{data?.result?.data[0].Name}</p>
            <p>{data?.result?.data[0].Address}</p>
            <p>
              {data?.result?.data[0].PostCode}, {data?.result?.data[0].CityName}
            </p>
            <p>PIB: {user.Organization.TaxNo}</p>
            <p>Maticni broj:</p>
            <p>PDV broj:{user.Organization.VatNo}</p>
          </div>
          <div className={style.invoiceLogoHolder}>
            {" "}
            <img
              src={`${data?.result?.data[0].Logo}?inline=true`}
              alt="Company logo"
            ></img>
          </div>
        </div>
        {/* Invoice settings */}
        <div className={style.invoiceSettingsHolder}>
          <h4>Podesavanja racuna:</h4>
          <div className={style.invoiceEsentialSettings}>
            {/* Nacin placanja */}
            <select
              onChange={(e) =>
                inputFunction("InvPaymentTypeCodeNameSC__Code", e.target.value)
              }
            >
              <option value={"NONCASH"}>Bezgotovinski</option>
              <option value={"CASH"}>Gotovinski</option>
            </select>
            {/* Vrsta prodaje */}
            <select
              onChange={(e) =>
                inputFunction("InvSaleTypeSC__Code", e.target.value)
              }
            >
              <option value={"Wholesale"}>Veleprodaja</option>{" "}
              <option value={"Retailsale"}>Maloprodaja</option>
            </select>
            {/* Rok placanja */}

            <input
              type={"text"}
              onChange={(e) => inputFunction("InvDueDate", e.target.value)}
              placeholder="Rok placanja"
              onFocus={(e) => (e.target.type = "date")}
            />
            {/* Po broju ponude */}
            <input
              placeholder="Ponuda"
              type={"text"}
              onChange={(e) => inputFunction("BuyerOrderRef", e.target.value)}
              data-required={invoiceValidationWarrning}
            />
            {/* Datum isporuke */}
            <input
              type={"text"}
              onFocus={(e) => (e.target.type = "date")}
              placeholder={"Isporuka od"}
            ></input>
            <input
              type={"text"}
              onFocus={(e) => (e.target.type = "date")}
              placeholder={"Isporuka do"}
            ></input>
          </div>
          <div className={style.invoiceIssueDateHolder}>
            <p>Mjesto izdavanja: {data?.result?.data[0].CityName}</p>{" "}
            <p>{currentDate.toISOString().split("T")[0]}</p>
          </div>
        </div>
        {/* Prva napomena */}
        <div className={style.firstInvoiceNoteHolder}>
          <h4>Napomena:</h4>
          <textarea
            placeholder="Upišite početne napomene"
            onChange={(e) => {
              inputFunction("InvPreNote", e.target.value);
            }}
          />
        </div>
        {/* Buyer data holder.... IMPORTANT */}
        <div className={style.buyerDataHolder}>
          <h4>Kupac:</h4>
          <select>
            <option>Tip kupca</option>
            <option>Domaci</option>
          </select>
          <div className={style.buyerData}>
            <input
              className={style.nameInput}
              type={"text"}
              placeholder="Naziv kupca"
              value={BuyerFormalName}
              data-required={invoiceValidationWarrning}
              onChange={(e) => {
                inputFunction("BuyerFormalName", e.target.value);
                setBuyerFormalName(e.target.value);
                setBuyerSearch(e.target.value);
              }}
            />
            <div className={style.searchContainer}>
              <SearchResoult
                searchIntent={buyerSearch}
                functions={setSearchBuyerResult}
              />
            </div>

            <input
              type={"text"}
              value={BuyerPostCode}
              placeholder="Post code"
              data-required={invoiceValidationWarrning}
              onChange={(e) => {
                setBuyerPostCode(e.target.value);
                inputFunction("BuyerPostCode", e.target.value);
              }}
            />

            <input
              type={"text"}
              placeholder="Adresa"
              data-required={invoiceValidationWarrning}
              value={BuyerAddress}
              onChange={(e) => {
                setAddress(e.target.value);
                inputFunction("BuyerAddress1", e.target.value);
              }}
            />
            <input
              type={"text"}
              placeholder="Grad"
              value={BuyerCity}
              data-required={invoiceValidationWarrning}
              onChange={(e) => {
                setBuyerCity(e.target.value);
                inputFunction("BuyerCityName", e.target.value);
              }}
            />
            <input
              type={"number"}
              value={BuyerTaxNum}
              placeholder="PIB"
              onChange={(e) => {
                setBuyerTaxNum(e.target.value);
                inputFunction("BuyerTaxNum", e.target.value);
              }}
            />

            <input
              type={"text"}
              value={BuyerRegNum}
              placeholder="ID"
              onChange={(e) => {
                setBuyerRegNum(e.target.value);
                inputFunction("BuyerRegNum", e.target.value);
              }}
            />
            <input
              type={"text"}
              value={BuyerVatNum}
              placeholder="PDV obveznik"
              onChange={(e) => {
                setBuyerVatNum(e.target.value);
                inputFunction("BuyerVatNum", e.target.value);
              }}
            />
          </div>
        </div>
      </div>
      {/* Articles container, display (Table) */}
      <div className={style.articlesContainer}>
        <h3>Artikli:</h3>
        <table>
          <tbody>
            <tr className={style.tableHeder}>
              <th>Nazov stave</th>
              <th>Kolicina</th>
              <th>JM</th>
              <th>bez PDV</th>
              <th>%PDV</th>
              <th>sa PDV</th>
              <th>Iznos bez PDV</th>
              <th>Iznos PDV</th>
              <th>Iznos sa PDV</th>
            </tr>
            {/* Articles listing */}
            {articles.map((article) => {
              return (
                <tr
                  className={style.newArticleHolder}
                  key={articles.indexOf(article)}
                >
                  <td>{article.ItemName}</td>

                  <td>{article.Quantity}</td>
                  <td>{article.UMCodeNameSC__Code}</td>
                  <td>{article.ItemNetPrice}</td>
                  <td>{article.Rate}</td>
                  <td>
                    {
                     (Number(article.ItemNetPrice) * Number(article.Rate)) /
                        100 +
                        Number(article.ItemNetPrice)
                    }
                  </td>
                  <td>
                    {Number(article.ItemNetPrice) * Number(article.Quantity)}
                  </td>
                  <td>
                    {((Number(article.ItemNetPrice) *
                      Number(article.Quantity) *
                      Number(article.Rate)) /
                      100)}
                  </td>
                  <td>
                    {Number(article.ItemNetPrice) * Number(article.Quantity) +
                      ((Number(article.ItemNetPrice) *
                        Number(article.Quantity) *
                        Number(article.Rate)) /
                        100)}
                    <BsFillXSquareFill
                      className={style.dropItemIcon}
                      onClick={() => {
                        removeArticle(article);
                      }}
                    />
                  </td>
                </tr>
              );
            })}
            {/* End of article listing */}
            {/* Article input container */}
            {articles.length < 1 && invoiceValidationWarrning === true ? (
              <p
                className={style.ItemInputWarrning}
                data-showWarning={invoiceValidationWarrning}
              >
                Morate unijeti makar jednu stavku
              </p>
            ) : (
              ""
            )}
            {articles.length > 6 - 1 ? (
              ""
            ) : (
              <tr className={style.articleInputContainer}>
                <td>
                  <input
                    type={"text"}
                    value={ItemName}
                    onChange={(e) => setItemName(e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type={"number"}
                    value={Quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </td>
                <td>
                  <select
                    value={UMCodeNameSC__Code}
                    onChange={(e) => setUMCodeNameSC__Code(e.target.value)}
                    className={style.itemType}
                  >
                    <option value={"kom"}>kom</option>

                    <option value={"pack"}>pak</option>
                  </select>
                </td>
                <td>
                  <input
                    value={ItemNetPrice}
                    type={"number"}
                    onChange={(e) => setItemNetPrice(e.target.value)}
                  />
                </td>
                <td>
                  {/* <input
                    type={"number"}
                    placeholder="21"
                    onChange={(e) => setItemVatCodeSC__VatCode(e.target.value)}
                  /> */}
                  <select
                    onChange={(e) =>
                      console.log(
                        setItemVatCodeSC__VatCode(JSON.parse(e.target.value))
                      )
                    }
                  >
                    {vatInvoice.map((vatCode) => {
                      return (
                        <option
                          key={vatCode.Id}
                          value={JSON.stringify(vatCode)}
                        >
                          {vatCode.Rate}, {vatCode.VatCodeDesc}
                        </option>
                      );
                    })}
                  </select>
                </td>
                <td>
                  <button
                    className={style.buttonAdd}
                    onClick={() => {
                      if (
                        (!ItemName &&
                          ItemName != "" &&
                          Quantity >= 1 &&
                          !UMCodeNameSC__Code,
                        ItemNetPrice !== 0,
                        ItemVatCodeSC__VatCode != "21")
                      ) {
                        console.log(
                          ItemName,
                          Quantity,
                          UMCodeNameSC__Code,
                          ItemNetPrice,
                          ItemVatCodeSC__VatCode
                        );
                        addNewArticle();

                        setItemName("");
                        setQuantity(1);
                        setUMCodeNameSC__Code("piece");
                        setItemNetPrice(0);
                        setItemVatCodeSC__VatCode("21");
                      } else alert("Niste popunili sve kako treba");
                    }}
                  >
                    <BsFillPlusSquareFill className={style.icon} />
                  </button>
                </td>
              </tr>
            )}{" "}
            {/* Article input container END */}
          </tbody>
        </table>
      </div>
      {/* Article invoice bottom container, payement details and calculations */}
      <div className={style.invoiceBottomContainer}>
        <div className={style.invoiceGeneral}>
          <h4>Opste napomene:</h4>
          <textarea
            placeholder="Upišite opšte napomene"
            onChange={(e) => inputFunction("InvNote", e.target.value)}
          />
        </div>
        <div className={style.payementMethods}>
          <table>
            <tbody>
              <tr>
                <th>Nacin placanja</th>
                <th>Dodatni podaci</th>
              </tr>
              <tr>
                <td>
                  <select>
                    <option>Virman</option>
                  </select>
                </td>
                <td>
                  <div>
                    <input type={"text"} placeholder="Br. racuna" />
                    <input type={"text"} placeholder="Bic/Switf" />
                    <input type={"text"} placeholder="Doznaka info." />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={style.calculationsContainer}>
          <table>
            <tbody>
              <tr>
                <th>Neto iznos stavki</th>
                <th></th>
              </tr>
              <tr>
                <td>Ukupan iznos bez PDV</td>
                <td>{ammountWithoutPDV}</td>
              </tr>
              <tr>
                <td>Ukupan iznos PDV</td>
                <td>{totalAmmountOfPDV}</td>
              </tr>
              <tr>
                <td>Ukupan iznos sa PDV</td>
                <td>{(ammountWithoutPDV + totalAmmountOfPDV)}</td>
              </tr>
            </tbody>
          </table>
          <h4>
            Ukupno za placanje:{" "}
            <span>{(ammountWithoutPDV + totalAmmountOfPDV)}</span>
          </h4>
        </div>
      </div>
      {/* Controlls holder */}
      <div className={style.invoiceControlsHolder}>
        <button
          className={style.saveBtn}
          onClick={() => {
            console.log(props);
            invoiceSaveProcedure();
          }}
        >
          Save invoice
        </button>

        <button
          className={style.fisBtn}
          onClick={() => {
            invoiceSaveProcedure([35, 40]);
          }}
        >
          Fiscalize
        </button>
        <button
          className={style.resetBtn}
          onClick={() => resetInvoiceEditor(true)}
        >
          Reset
        </button>
      </div>
      {loading ? (
        <div className={style.invoiceSubmitLoader}>
          {" "}
          <LoadingAnimation />
        </div>
      ) : (
        ""
      )}
      {invoiceSaveResponse ? (
        <div className={style.responseAfterSave}>
          {" "}
          {invoiceSaveResponse.data.result.Status === "OK" ? (
            <div className={style.okResponse}>
              <BsFillCheckCircleFill /> <p>Inovice saved</p>{" "}
              <button
                onClick={() => {
                  window.location.reload();
                }}
              >
                Make new
              </button>
            </div>
          ) : (
            <div className={style.errorResponse}>
              <BsFillExclamationCircleFill />
              <p>The invoice didn't pass validation!</p>
              <button
                onClick={() => {
                  window.location.reload();
                }}
              >
                Try again
              </button>
            </div>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
