import LoadingStyle from "./LoadingStyle.module.css"
export const LoadingAnimation = ()=>{
    return <div className={LoadingStyle.box}>
    <div className={LoadingStyle.container}>
      <span className={LoadingStyle.circle}></span>
      <span className={LoadingStyle.circle}></span>
      <span className={LoadingStyle.circle}></span>
      <span className={LoadingStyle.circle}></span>
    </div>
  </div>
}