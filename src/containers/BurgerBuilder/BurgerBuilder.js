import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from "../../store/actions/index";

const BurgerBuilder = () => {
  const [purchasing, setPurchasing] = useState(false);
  const dispatch = useDispatch();

  const burgerBuilder = useSelector(state => state && state.burgerBuilder);
  const order = useSelector(state => state && state.order);

  useEffect(() => {
    if(order && order.loading && purchasing){
      setPurchasing(!order.loading)
    }
  }, [order, purchasing]);

  const updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map(igKey => ingredients[igKey])
      .reduce((sum, el) => sum + el, 0);
    return sum > 0;
  }

  const purchaseHandler = () => setPurchasing(true);

  const purchaseCancelHandler = () => setPurchasing(false);

  const purchaseContinueHandler = () => dispatch(actions.purchaseBurger({
      ingredients: burgerBuilder.ingredients,
      price: (burgerBuilder.totalPrice).toFixed(2)
    }));

    const disabledInfo = {
      ...burgerBuilder.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    let burger = burgerBuilder.error ? (
      <p>Ingredients can't be loaded!</p>
    ) : (
      <Spinner />
    );

    if (burgerBuilder.ingredients) {
      burger = (
        <div>
          <Burger ingredients={burgerBuilder.ingredients} />
          <BuildControls
            ingredientAdded={ingName => dispatch(actions.addIngredient(ingName))}
            ingredientRemoved={ingName => dispatch(actions.removeIngredient(ingName))}
            disabled={disabledInfo}
            purchasable={updatePurchaseState(burgerBuilder.ingredients)}
            ordered={purchaseHandler}
            price={burgerBuilder.totalPrice}
          />
        </div>
      );
      orderSummary = (
        <OrderSummary
          ingredients={burgerBuilder.ingredients}
          price={burgerBuilder.totalPrice}
          purchaseCancelled={purchaseCancelHandler}
          purchaseContinued={purchaseContinueHandler}
        />
      );
    }

    return (
      <div>
        <Modal
          show={purchasing}
          modalClosed={purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </div>
    );
  }

export default BurgerBuilder;
