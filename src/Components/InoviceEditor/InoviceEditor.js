import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import useRpc from "../../Hooks/rpcHooks/useRpc";
import InvoiceEditorStyle from "./InvoiceEditorStyle.module.css";
export const InvoiceEditor = ({ props }) => {
  // Invoice editor style
  const style = InvoiceEditorStyle;

  // Current user info from global state
  const [user] = useContext(UserContext);

  // Invoice owner infro from backend
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
  const [totalAmmount, settotalAmmount] = useState(0);

  useEffect(() => {
    getInvoOwnerInfo(); //Invoice owner info will be changed based on the current active user and primary organization from the Rpc Object
  }, [user]);
  useEffect(() => {
    props.Invoice.EU_Invoices.InvAmountInclVatInp =
      ammountWithoutPDV + totalAmmountOfPDV;
    props.Invoice.EU_Invoices.InvTotalVatAmountCCInp = totalAmmountOfPDV;
    props.Invoice.EU_Invoices._details.EU_Invoices_PaymentInstrs[0].PaymentAmount = ammountWithoutPDV +totalAmmountOfPDV




  }, [ammountWithoutPDV]);
  const calculateAll = () => {
    articles.map((article) => {
      let sum = Number(article.ItemNetPrice) * Number(article.Quantity);
      sum = ammountWithoutPDV + sum;
      setAmmountWithoutPDV(sum);

      let pdvSum =
        Number(totalAmmountOfPDV) +
        Number(article.ItemNetPrice) *
          Number(article.Quantity) *
          (Number(article.ItemVatCodeSC__VatCode) / 100);
      setTotalAmmountOfPDV(pdvSum);
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

  const inputFunction = (key, value) => {
    props.Invoice.EU_Invoices[key] = value;
  }; //Filles in the invoice object

  return (
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
              placeholder="Post COde"
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
            {/* <input
              type={"text"}
              placeholder="Maticni broj"
              onChange={(e) => {
                inputFunction("BuyerRegNum", e.target.value);
              }}
            /> */}
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
            {/* <input type={"text"} placeholder="Korisnik javnih sredstava" onChange={e=>{inputFunction('BuyerFormalName',e.target.value)}} /> */}
          </div>
        </div>
      </div>
      <div className={style.articlesContainer}>
        <h3>Artikli:</h3>
        <table>
          <tbody>
            <tr className={style.tableHeder}>
              <th>Nazov stave</th>
              <th>Kolicina</th>
              <th>UMCodeNameSC__Code</th>
              <th>Cijena bez PDV</th>
              <th>%PDV</th>
              <th>Cijena sa PDV</th>
              <th>Iznos bez PDV</th>
              <th>Iznos PDV</th>
              <th>Iznos sa PDV</th>
            </tr>
            {articles.map((article) => {
              return (
                <tr>
                  <td>{article.ItemName}</td>

                  <td>{article.Quantity}</td>
                  <td>Kom</td>
                  <td>{article.ItemNetPrice}</td>
                  <td>{article.ItemVatCodeSC__VatCode}</td>
                  <td>
                    {Math.round(
                      Number(article.ItemNetPrice) * 0.21 +
                        Number(article.ItemNetPrice)
                    )}
                  </td>
                  <td>
                    {Number(article.ItemNetPrice) * Number(article.Quantity)}
                  </td>
                  <td>
                    {Number(article.ItemNetPrice) *
                      Number(article.Quantity) *
                      0.21}
                  </td>
                  <td>
                    {Number(article.ItemNetPrice) * Number(article.Quantity) +
                      Number(article.ItemNetPrice) *
                        Number(article.Quantity) *
                        0.21}
                  </td>
                </tr>
              );
            })}
            <tr>
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
                  defaultValue={"21"}
                />
              </td>
              <td>
                <button
                  onClick={() => {
                    addNewArticle();
                  }}
                >
                  add
                </button>
              </td>
            </tr>{" "}
          </tbody>
        </table>
      </div>

      <div className={style.invoiceBottomContainer}>
        <div className={style.invoiceGeneral}>
          <h4>Opste napomene:</h4>
          <textarea />
        </div>
        <div className={style.paymentMethodsContainer}> </div>
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
        <h4>Ukupno za placanje {ammountWithoutPDV + totalAmmountOfPDV}</h4>
      </div>
      <button
        onClick={() => {
          props.Invoice.EU_Invoices._details.EU_Invoices_Items = articles;

          props.Invoice.EU_Invoices.BuyerOrderRef = "Ugovor";
          console.log(props);
          saveInvoice(props.Invoice);
        }}
      >
        Save invoice
      </button>
    </div>
  );
};
