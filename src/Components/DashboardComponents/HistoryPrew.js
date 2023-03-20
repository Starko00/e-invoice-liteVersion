import { useEffect } from 'react'
import useRpc from '../../Hooks/rpcHooks/useRpc'
import HistoryPrewStyle from './HistoryPrewStyle.module.css'
import {LoadingAnimation} from './../AuthComponents/LoadingElement/LoadingAnimation'
export const HistoryPrew = ()=>{
    const{data,loading,getInvoicesFromPreparation,getOneInvoice} = useRpc()
    useEffect(()=>{
        getInvoicesFromPreparation()
    },[])
    useEffect(()=>{
       console.log(loading)
    },[loading])
    const style = HistoryPrewStyle
    return <div className={style.container}>
        <h4>Istorija:</h4>
        <div className={style.invoicesHolder}>
            {!loading && data ?data.result.data.map(invoice=>{
                
                return  <div key={invoice.Id} className={style.invoice} onClick={()=>{ getOneInvoice(invoice.Id)}}><p >{invoice.InvIssueDate?.split('T')[0]}</p><p className={style.invoiceBuyerName}>{invoice.BuyerFormalName}</p> <p>Iznos: {invoice.InvAmountInclVat}</p> <p>Status:<div data-status={invoice.StepStatus} className={style.status}></div></p></div>
            }):<LoadingAnimation/>}
            
           
            
        
        </div>
    </div>
}