import CloseImg from "../../assets/media/close.svg";

export default function DeleteButton({ onClick, style }) {
    return (
        <button className={style.saveButton} onClick={onClick}>
            <img className={style.deleteBtn} src={CloseImg} alt="delete" />
        </button>
    );
}