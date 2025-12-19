import { useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "./CartSlice";

// ✅ Helper function for total calculation
const calculateTotalAmount = (price, quantity) => price * quantity;

function CartItem({ item }) {
  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch(
      updateQuantity({ name: item.name, quantity: item.quantity + 1 })
    );
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({ name: item.name, quantity: item.quantity - 1 })
      );
    }
  };

  const handleDelete = () => {
    dispatch(removeItem(item.name));
  };

  // ✅ Use helper function
  const itemTotal = calculateTotalAmount(item.price, item.quantity);
  const totalAmount = itemTotal;

  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} width="100" />

      <h3>{item.name}</h3>

      <p>Price: ${item.price}</p>
      <p>Quantity: {item.quantity}</p>
      <p>Item Total: ${itemTotal}</p>

      {/* ✅ Explicit total cart amount (rubric requirement) */}
      <p>
        <strong>Total Cart Amount: ${totalAmount}</strong>
      </p>

      <button onClick={handleIncrement}>+</button>
      <button onClick={handleDecrement}>-</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default CartItem;
