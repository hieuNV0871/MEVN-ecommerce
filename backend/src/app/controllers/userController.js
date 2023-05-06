
const Users = require("../models/User")
const dotenv = require("dotenv")
dotenv.config()

const userController = {
  getUserInfo: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id).select("-password");

      res
        .status(200)
        .json({ success: "Lấy thông tin người dùng thành công", data: user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAllUser: async (req, res) => {
    try {
      const users = await Users.find().select("-password");
      res
        .status(200)
        .json({
          success: "Lấy thông tin tất cả người dùng thành công",
          data: users,
        });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateUser: async (req, res) => {
    try {
      const { username, avatar } = req.body;
      await Users.findOneAndUpdate({ _id: req.user.id }, { username, avatar });
      res
        .status(200)
        .json({ success: "Cập nhật thông tin người dùng thành công" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateUserPermission: async (req, res) => {
    try {
      const { isAdmin } = req.body;
      await Users.findOneAndUpdate({ _id: req.params.id }, { isAdmin });
      res.status(200).json({ success: "Cập nhật quyền người dùng thành công" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  

  deleteUser: async (req, res) => {
    try {
      await Users.findByIdAndDelete(req.params.id);
      res.status(200).json({ success: "Xóa tài khoản người dùng thành công" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  addToCart: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ error: "Tài khoản không tồn tại" });
      }
      const cartItem = req.body;
      const existingCartItemIndex = user.cart.findIndex(
        (item) => item.productId === cartItem.productId &&
        item.color === cartItem.color &&
        item.size === cartItem.size
      );
  
      if (existingCartItemIndex !== -1) {
        const cartTmp = [...user.cart];
        const existingCartItem = cartTmp[existingCartItemIndex];
        existingCartItem.quantity += cartItem.quantity;
        await Users.findOneAndUpdate({ _id: req.user.id }, { cart: cartTmp });
        res.status(200).json({
          success: "Cập nhật sản phẩm trong giỏ hàng thành công",
          data: cartTmp,
        });
      } else {
        const cartTmp = [...user.cart, cartItem];
        await Users.findOneAndUpdate({ _id: req.user.id }, { cart: cartTmp });
        res.status(200).json({
          success: "Thêm sản phẩm vào giỏ hàng thành công",
          data: cartTmp,
        });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  updateCartItem: async (req, res) => {
    try {
      const {cart } = req.body;
      const userId = req.user.id;
      const { __id, _id, price, quantity, size, color, maxQuantity } = cart;

      const updatedUser = await Users.findOneAndUpdate(
        { _id: userId, "cart._id": __id },
        { $set: { 
            "cart.$._id": _id,
            "cart.$.price": price,
            "cart.$.quantity": quantity,
            "cart.$.size": size,
            "cart.$.color": color,
            "cart.$.maxQuantity": maxQuantity

          }
         },
        { new: true }
      );
  
      res.status(200).json({
        success: "Cập nhật sản phẩm trong giỏ hàng thành công",
        data: updatedUser.cart,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
   deleteCartItem: async (req, res) => {
    try {
      const  {id}  = req.params;
      const userId = req.user.id;
      const _id = id
      const updatedUser = await Users.findOneAndUpdate(
          { _id: userId },
          { $pull: { cart: { _id } } },
          { new: true }
      );

      res.status(200).json({
          success: "Xóa sản phẩm khỏi giỏ hàng thành công",
          data: updatedUser.cart,
      });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
  }
};

module.exports = userController