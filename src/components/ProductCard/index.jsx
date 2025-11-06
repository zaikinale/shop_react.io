import style from './style.module.css';
import heartUnactive from "../../assets/heart_unactive.svg";


export default function ProductCard({ card }) {
  function generateTags() {
    const tags = [];
    if (card.isHit) {
      tags.push(<p key="hit" className={style.statusCardHit}>ХИТ</p>);
    }
    if (card.isPremium) {
      tags.push(<p key="premium" className={style.statusCardPremium}>Премиум</p>);
    }
    if (card.isNew) {
      tags.push(<p key="new" className={style.statusCardNew}>NEW</p>);
    }
    if (card.salary !== 0) {
      tags.push(<p key="salary" className={style.statusCardSalary}>SALARY</p>);
    }
    return tags;
  }

  function generateActPrice() {
    if (card.salary !== 0) {
      const discountAmount = Math.round(card.price * (card.salary / 100));
      const finalPrice = card.price - discountAmount;

      return (
        <div className={style.priceContainer}>
          <h4 className={style.finalPrice}>{finalPrice}₽</h4>
          <div className={style.salaryContainer}>
            <span className={style.originalPrice}>{card.price}₽</span>
            <span className={style.salary}>-{card.salary}%</span>
          </div>
        </div>
      );
    } else {
      return (
        <div className={style.priceContainer}>
          <h4 className={style.finalPrice}>{card.price}₽</h4>
        </div>
      );
    }
  }

  return (
    <div className={style.cardProduct}>
      <div className={style.headerCard}>
        <div className={style.tags}>
          {generateTags()}
        </div>
        <button className={style.saveButton} aria-label="Сохранить">
          <img
            className={style.save}
            src={heartUnactive}
            alt="Сохранить"
          />
        </button>
      </div>
      <img
        className={style.imgProduct}
        src={card.img.trim()}
        alt={card.name || 'Товар'}
      />
      <div className={style.descriptionContainer}>
        {generateActPrice()}
        <p className={style.description}>{card.name}</p>
      </div>
      <button className={style.btnChoose}>Выбрать</button>
    </div>
  );
}