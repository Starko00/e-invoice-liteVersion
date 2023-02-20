import LoadingStyle from "./LoadingStyle.module.css"
export const LoadingAnimation = ()=>{
    return <div class={LoadingStyle.box}>
    <div class={LoadingStyle.container}>
      <span class={LoadingStyle.circle}></span>
      <span class={LoadingStyle.circle}></span>
      <span class={LoadingStyle.circle}></span>
      <span class={LoadingStyle.circle}></span>
    </div>
  </div>
}