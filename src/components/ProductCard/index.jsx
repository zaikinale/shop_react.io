// import style from './style.module.css';
// import { useState } from 'react';
// import heartUnactive from "../../assets/heart_unactive.svg";
// import heartActive from "../../assets/heart_active.svg";


// export default function ProductCard({ card }) {

//   const [isOn, setIsOn] = useState(false)

//   function generateTags() {
//     const tags = [];
//     if (card.isHit) {
//       tags.push(<p key="hit" className={style.statusCardHit}>ХИТ</p>);
//     }
//     if (card.isPremium) {
//       tags.push(<p key="premium" className={style.statusCardPremium}>ПРЕМИУМ</p>);
//     }
//     if (card.isNew) {
//       tags.push(<p key="new" className={style.statusCardNew}>NEW</p>);
//     }
//     if (card.salary !== 0) {
//       tags.push(<p key="salary" className={style.statusCardSalary}>SALARY</p>);
//     }
//     return tags;
//   }

//   function generateActPrice() {
//     if (card.salary !== 0) {
//       const discountAmount = Math.round(card.price * (card.salary / 100));
//       const finalPrice = card.price - discountAmount;

//       return (
//         <div className={style.priceContainer}>
//           <h4 className={style.finalPrice}>{finalPrice}₽</h4>
//           <div className={style.salaryContainer}>
//             <span className={style.originalPrice}>{card.price}₽</span>
//             <span className={style.salary}>-{card.salary}%</span>
//           </div>
//         </div>
//       );
//     } else {
//       return (
//         <div className={style.priceContainer}>
//           <h4 className={style.finalPrice}>{card.price}₽</h4>
//         </div>
//       );
//     }
//   }

//   function toggleBtnSave () {
//     setIsOn(state => !state)
//   }

//   return (
//     <div className={style.cardProduct}>
//       <div className={style.headerCard}>
//         <div className={style.tags}>
//           {generateTags()}
//         </div>
//         <button className={style.saveButton} aria-label="Сохранить" onClick={toggleBtnSave}>
//           <img
//             className={style.save}
//             src={isOn ? heartActive : heartUnactive }
//             alt="Сохранить"
//           />
//         </button>
//       </div>
//       <img
//         className={style.imgProduct}
//         src={card.img.trim()}
//         alt={card.name || 'Товар'}
//       />
//       <div className={style.descriptionContainer}>
//         {generateActPrice()}
//         <p className={style.description}>{card.name}</p>
//       </div>
//       <button className={style.btnChoose}>Выбрать</button>
//     </div>
//   );
// }
import style from './style.module.css';
import { useState } from 'react';
import heartUnactive from "../../assets/heart_unactive.svg";
import heartActive from "../../assets/heart_active.svg";

export default function ProductCard({ card }) {
  const [isOn, setIsOn] = useState(false);

  function generateTags() {
    const tags = [];
    const marks = card.marks || [];

    if (marks.some(m => m.Mark_Name === 'hit')) {
      tags.push(<p key="hit" className={style.statusCardHit}>ХИТ</p>);
    }
    if (marks.some(m => m.Mark_Name === 'premium')) {
      tags.push(<p key="premium" className={style.statusCardPremium}>ПРЕМИУМ</p>);
    }
    if (marks.some(m => m.Mark_Name === 'new')) {
      tags.push(<p key="new" className={style.statusCardNew}>NEW</p>);
    }
    if (marks.some(m => m.Mark_Name === 'sale' || m.Mark_Name === 'discount')) {
      tags.push(<p key="sale" className={style.statusCardSalary}>SALE</p>);
    }

    return tags;
  }

  function generateActPrice() {
    const marks = card.marks || [];
    const hasSale = marks.some(m => m.Mark_Name === 'sale' || m.Mark_Name === 'discount');

    if (hasSale && card.old_price) {
      return (
        <div className={style.priceContainer}>
          <h4 className={style.finalPrice}>{card.price}₽</h4>
          <div className={style.salaryContainer}>
            <span className={style.originalPrice}>{card.old_price}₽</span>
            <span className={style.salary}>-{Math.round(100 - (card.price / card.old_price) * 100)}%</span>
          </div>
        </div>
      );
    } else {
      return (
        <div className={style.priceContainer}>
          <h4 className={style.finalPrice}>{card.price}₽</h4>
          {card.old_price && <s style={{ color: '#999' }}>{card.old_price}₽</s>}
        </div>
      );
    }
  }

  function toggleBtnSave() {
    setIsOn(state => !state);
  }

  return (
    <div className={style.cardProduct}>
      <div className={style.headerCard}>
        <div className={style.tags}>
          {generateTags()}
        </div>
        <button className={style.saveButton} aria-label="Сохранить" onClick={toggleBtnSave}>
          <img
            className={style.save}
            src={isOn ? heartActive : heartUnactive}
            alt="Сохранить"
          />
        </button>
      </div>
      {card.images?.[0]?.Image_URL ? <img className={style.imgProduct} src={card.images?.[0]?.Image_URL} alt={card.name}/> : <div className={style.imgProductPlaceholder}></div> }

      
      <div className={style.descriptionContainer}>
        {generateActPrice()}
        <p className={style.description}>{card.name}</p>
      </div>
      <button className={style.btnChoose}>Выбрать</button>
    </div>
  );
}