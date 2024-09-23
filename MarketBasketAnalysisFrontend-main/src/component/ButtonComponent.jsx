import '../styles/buttonComponent.css'
const ButtonComponent = ({text,padLeft = '30px',url="#"}) => {
  return <button className="reusable__btn" style={{paddingLeft:`${padLeft}`,paddingRight:`${padLeft}`}}><a href={url}>{text}</a></button>;
}
export default ButtonComponent;