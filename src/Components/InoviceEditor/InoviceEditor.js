import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import useRpc from "../../Hooks/rpcHooks/useRpc";
import InvoiceEditorStyle from "./InvoiceEditorStyle.module.css";
import { BsFillPlusSquareFill, BsFillXSquareFill } from "react-icons/bs";
import { SearchResoult } from "./InvoiceEditorInnerComponent/SearchResoult";
import { LoadingAnimation } from "../AuthComponents/LoadingElement/LoadingAnimation";
export const InvoiceEditor = ({ props }) => {
  // Invoice editor style
  const style = InvoiceEditorStyle;

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
  useEffect(() => {
    getInvoOwnerInfo(); //Invoice owner info will be changed based on the current active user and primary organization from the Rpc Object
  }, [user]);
  useEffect(() => {
    props.Invoice.EU_Invoices.InvAmountInclVatInp =
      ammountWithoutPDV + totalAmmountOfPDV;
    props.Invoice.EU_Invoices.InvTotalVatAmountCCInp = totalAmmountOfPDV;
    props.Invoice.EU_Invoices._details.EU_Invoices_PaymentInstrs[0].PaymentAmount =
      ammountWithoutPDV + totalAmmountOfPDV;
  }, [ammountWithoutPDV]);
  const calculateAll = () => {
    articles.map((article) => {
      let sum = 0;

      sum = Number(article.ItemNetPrice) * Number(article.Quantity);
      sum = ammountWithoutPDV + sum;
      setAmmountWithoutPDV(sum);

      let pdvSum =
        Number(totalAmmountOfPDV) +
        Number(article.ItemNetPrice) *
          Number(article.Quantity) *
          (Number(article.ItemVatCodeSC__VatCode) / 100);
      setTotalAmmountOfPDV(pdvSum);
      return true;
    }); //Calculates the finall sum of the articles
  };
  useEffect(() => {
    calculateAll();
  }, [articles]); //Calls the callculation function when a new article has been added

  const addNewArticle = () => {
    setArticles((articles) => [
      ...articles,
      {
        ItemName,
        Quantity: Number(Quantity),
        ItemNetPrice: Number(ItemNetPrice),
        UMCodeNameSC__Code,
        ItemVatCodeSC__VatCode,
        ItemVatCodeSC,
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
    if (checker.length === 0) {
      validation = true;
      return { status: true, required: [...checker] };
    } else {
      return { status: false, required: [...checker] };
    }
  }; //Validates if all the required fields have been submited

  const invoiceSaveProcedure = (steps = [30]) => {
    console.log(invoiceValidation());
    if (invoiceValidation().status === true) {
      console.log("Faktura sacuvana");
      saveInvoice(props.Invoice, steps);
      return 
    }
    alert("Invoice has miisng fields");
  }; //Alerts the user about the status of all required fields
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
              onChange={(e) => {
                setBuyerPostCode(e.target.value);
                inputFunction("BuyerPostCode", e.target.value);
              }}
            />
            <input
              type={"text"}
              placeholder="Adresa"
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
                  <td>{article.ItemVatCodeSC__VatCode}</td>
                  <td>
                    {Math.round(
                      (Number(article.ItemNetPrice) *
                        Number(article.ItemVatCodeSC__VatCode)) /
                        100 +
                        Number(article.ItemNetPrice)
                    )}
                  </td>
                  <td>
                    {Number(article.ItemNetPrice) * Number(article.Quantity)}
                  </td>
                  <td>
                    {(Number(article.ItemNetPrice) *
                      Number(article.Quantity) *
                      Number(article.ItemVatCodeSC__VatCode)) /
                      100}
                  </td>
                  <td>
                    {Number(article.ItemNetPrice) * Number(article.Quantity) +
                      (Number(article.ItemNetPrice) *
                        Number(article.Quantity) *
                        Number(article.ItemVatCodeSC__VatCode)) /
                        100}
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
            <tr className={style.articleInputContainer}>
              <td>
                <input
                  type={"text"}
                  onChange={(e) => setItemName(e.target.value)}
                />
              </td>
              <td>
                <input
                  type={"number"}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </td>
              <td>
                <select
                  onChange={(e) => setUMCodeNameSC__Code(e.target.value)}
                  className={style.itemType}
                >
                  <option value={"kom"}>kom</option>

                  <option value={"pack"}>pak</option>
                </select>
              </td>
              <td>
                <input
                  type={"number"}
                  onChange={(e) => setItemNetPrice(e.target.value)}
                />
              </td>
              <td>
                <input
                  type={"number"}
                  onChange={(e) => setItemVatCodeSC__VatCode(e.target.value)}
                />
              </td>
              <td>
                <button
                  className={style.buttonAdd}
                  onClick={() => {
                    addNewArticle();
                  }}
                >
                  <BsFillPlusSquareFill className={style.icon} />
                </button>
              </td>
            </tr>{" "}
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
                <td>{ammountWithoutPDV + totalAmmountOfPDV}</td>
              </tr>
            </tbody>
          </table>
          <h4>
            Ukupno za placanje:{" "}
            <span>{ammountWithoutPDV + totalAmmountOfPDV}</span>
          </h4>
        </div>
      </div>
      {/* Controlls holder */}
      <div className={style.invoiceControlsHolder}>
        <button
          className={style.saveBtn}
          onClick={() => {
            props.Invoice.EU_Invoices._details.EU_Invoices_Items = articles;

            invoiceSaveProcedure();
          }}
        >
          Save invoice
        </button>

        <button
          className={style.fisBtn}
          onClick={() => {
            props.Invoice.EU_Invoices._details.EU_Invoices_Items = articles;
            invoiceSaveProcedure([35, 40]);
          }}
        >
          Fiscalize
        </button>
        <button
          className={style.resetBtn}
          onClick={() => invoiceSaveProcedure()}
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
    </div>
  );
};
