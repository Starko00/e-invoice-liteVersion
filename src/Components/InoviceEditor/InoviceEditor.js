import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import useRpc from "../../Hooks/rpcHooks/useRpc";
import InvoiceEditorStyle from "./InvoiceEditorStyle.module.css";
import { BsFillPlusSquareFill, BsFillXSquareFill } from "react-icons/bs";
export const InvoiceEditor = ({ props }) => {
  // Invoice editor style
  const style = InvoiceEditorStyle;
  console.log(props);
  // Current user info from global state
  const [user] = useContext(UserContext);

  // Invoice owner info from backend
  const { data, getInvoOwnerInfo, saveInvoice } = useRpc();

  // Articles array
  const [articles, setArticles] = useState([]);

  const [BuyerPostCode, setBuyerPostCode] = useState();
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

  // Inovice calculation inportant
  const [ammountWithoutPDV, setAmmountWithoutPDV] = useState(0);
  const [totalAmmountOfPDV, setTotalAmmountOfPDV] = useState(0);

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

  const inputFunction = (key, value) => {
    props.Invoice.EU_Invoices[key] = value;
  }; //Filles in the invoice object

  return (
    // Main invoice editor
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
            <p>Maticni broj:3123311</p>
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
            <select>
              <option>Nacin placanja</option>
              <option>Cash</option>
              <option>Non cahs</option>
            </select>
            {/* Vrsta prodaje */}
            <select>
              <option>Vrsta prodaje</option>
              <option>2</option>
            </select>
            {/* Rok placanja */}
            <select>
              <option>Rok placanja</option>
              <option>2</option>
            </select>
            {/* Datum isporuke */}
            <input type={"date"}></input>
            {/* Ref kupca */}
            <select>
              <option>Ref kupca</option>
              <option>2</option>
            </select>
            {/* Ugovor */}
            <select>
              <option>Ugovor</option>
              <option>2</option>
            </select>
          </div>
          <div className={style.invoiceIssueDateHolder}>
            <p>Mjesto izdavanja: Podgorica</p> <p>22.02.2023, 11:59</p>
          </div>
        </div>
        {/* Prva napomena */}
        <div className={style.firstInvoiceNoteHolder}>
          <h4>Napomena:</h4>
          <textarea
            placeholder="napomena"
            onChange={(e) => {
              inputFunction("ReceivingAdviceRef", e.target.value);
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
              type={"text"}
              placeholder="Naziv kupca"
              onChange={(e) => {
                inputFunction("BuyerFormalName", e.target.value);
              }}
            />
            <input
              type={"text"}
              placeholder="Post code"
              onChange={(e) => {
                inputFunction("BuyerPostCode", e.target.value);
              }}
            />
            <input
              type={"text"}
              placeholder="Adresa"
              onChange={(e) => {
                inputFunction("BuyerAddress1", e.target.value);
              }}
            />
            <input
              type={"text"}
              placeholder="Grad"
              onChange={(e) => {
                inputFunction("BuyerCityName", e.target.value);
              }}
            />
            <input
              type={"number"}
              placeholder="PIB"
              onChange={(e) => {
                inputFunction("BuyerTaxNum", e.target.value);
              }}
            />

            <input
              type={"text"}
              placeholder="ID"
              onChange={(e) => {
                inputFunction("BuyerRegNum", e.target.value);
              }}
            />
            <input
              type={"number"}
              placeholder="PDV obveznik"
              onChange={(e) => {
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
              <th>Cijena bez PDV</th>
              <th>%PDV</th>
              <th>Cijena sa PDV</th>
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
                <select onChange={(e) => setUMCodeNameSC__Code(e.target.value)}>
                  <option value={"kom"}>kom</option>
                  <option value={"pac"}>pac</option>
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
          <textarea />
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
      <div className={style.invoiceControlsHolder}>
        <button className={style.saveBtn}
          onClick={() => {
            props.Invoice.EU_Invoices._details.EU_Invoices_Items = articles;

            props.Invoice.EU_Invoices.BuyerOrderRef = "Ugovor";
            console.log(props);
            saveInvoice(props.Invoice);
          }}
        >
          Save invoice
        </button>
        <button className={style.fisBtn}>Fiscalize</button>
        <button className={style.resetBtn}>Reset</button>
      </div>
    </div>
  );
};
