const Bill = require("../models/Bill");
const Product = require("../models/Product");
const User = require("../models/User");

const billController = {
  //  NEED TO REFACTOR LATER. I WILL BE BACK

  createBill: async (req, res) => {
    try {
      const { order, name, userId, address, phone, paymentMethod, totalPrice } =
        req.body;
      if (order.length < 1)
        return res.status(400).json({ error: "Giỏ hàng của bạn đang trống" });
      if (!address)
        return res
          .status(400)
          .json({ error: "Vui lòng cập nhật địa chỉ giao hàng" });
      const newBill = new Bill({
        userId,
        name,
        order,
        address,
        phone,
        paymentMethod,
        totalPrice,
      });
      const user = await User.findById(userId)

      for (let i = 0; i < user.cart.length; i++) {
        for (let j = 0; j < order.length; j++) {
          if (user.cart[i].productId === order[j].productId) {
            user.cart[i].quantity = user.cart[i].quantity - order[j].quantity;
          }
        }
      }
      let cartTmp = [];
      for (let index = 0; index < user.cart.length; index++) {
        if (user.cart[index].quantity > 0) {
          cartTmp.push(user.cart[index]);
        }
      }
      const bill = await newBill.save();

      if (bill) {
        order.map((item) => {
          sold(item.productId, item.color, item.size, item.quantity);

        });
        await User.findByIdAndUpdate({ _id: user._id }, { cart: cartTmp });
      } else {
        return res.status(400).json({ error: "co loi xay ra" });
      }
      res
        .status(200)
        .json({ success: "Tạo đơn hàng thành công", data: newBill });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  //for payment middleware check
  updateStatusBill: async (req, res) => {
    try {
      const { status } = req.body;
      const _id = req.params.id;
      let updateBill
      if (false) {
         updateBill = await Bill.findByIdAndUpdate({ _id }, { status: 1 });
      }
      res
        .status(200)
        .json({ success: "Cập nhật đơn hàng thành công", data: updateBill });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // admin
  updateBill: async (req, res) => {
    try {
      const {
        order,
        name,
        status,
        user,
        address,
        phone,
        paymentMethods,
        totalPrice,
      } = req.body;
      if (order.length < 1)
        return res.status(400).json({ error: "Giỏ hàng của bạn đang trống" });
      if (!address)
        return res
          .status(400)
          .json({ error: "Vui lòng cập nhật địa chỉ giao hàng" });

      for (let i = 0; i < user.cart.length; i++) {
        for (let j = 0; j < order.length; j++) {
          if (user.cart[i]._id === order[j]._id) {
            user.cart[i].quantity = user.cart[i].quantity - order[j].quantity;
          }
        }
      }
      let cartTmp = [];
      for (let index = 0; index < user.cart.length; index++) {
        if (user.cart[index].quantity > 0) {
          cartTmp.push(user.cart[index]);
        }
      }
      const _id = req.params.id;
      const bill = await Bill.findByIdAndUpdate(
        { _id },
        {
          order,
          name,
          user,
          status,
          address,
          phone,
          paymentMethods,
          totalPrice,
        }
      );

      if (bill) {
        order.map((item) => {
          sold(item._id, item.color, item.size, item.quantity);
        });
        await User.findByIdAndUpdate({ _id: user._id }, { cart: cartTmp });
      } else {
        return res.status(400).json({ error: "co loi xay ra" });
      }
      res
        .status(200)
        .json({ success: "Cập nhật đơn hàng thành công", data: newBill });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  //    de day mai lam tiep ^^
  updatePersonalBill: async (req, res) => {
    try {
      const { order, name, user, address, phone, paymentMethods, totalPrice } =
        req.body;
      if (order.length < 1)
        return res.status(400).json({ error: "Giỏ hàng của bạn đang trống" });
      if (!address)
        return res
          .status(400)
          .json({ error: "Vui lòng cập nhật địa chỉ giao hàng" });

      for (let i = 0; i < user.cart.length; i++) {
        for (let j = 0; j < order.length; j++) {
          if (user.cart[i]._id === order[j]._id) {
            user.cart[i].quantity = user.cart[i].quantity - order[j].quantity;
          }
        }
      }
      let cartTmp = [];
      for (let index = 0; index < user.cart.length; index++) {
        if (user.cart[index].quantity > 0) {
          cartTmp.push(user.cart[index]);
        }
      }
      const _id = req.params.id;
      const bill = await Bill.findByIdAndUpdate(
        { _id },
        {
          order,
          name,
          user,
          address,
          phone,
          paymentMethods,
          totalPrice,
        }
      );

      if (bill) {
        order.map((item) => {
          sold(item._id, item.quantity);
        });
        await User.findByIdAndUpdate({ _id: user._id }, { cart: cartTmp });
      } else {
        return res.status(400).json({ error: "co loi xay ra" });
      }
      res
        .status(200)
        .json({ success: "Cập nhật đơn hàng thành công", data: newBill });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteOneBill: async (req, res) => {
    try {
      const id = req.params.id;
      const bill = await Bill.findById(id);
      if (!bill)
        return res
          .status(404)
          .json({ error: "Không tìm thấy hóa đơn của bạn" });
      await Bill.deleteById(id);
      res.status(200).json({ success: "Xoá đơn hàng thành công" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteSelectedBill: async (req, res) => {
    try {
      const _ids = req.body;
      await Bill.delete({ _id: { $in: _ids } }, { deleted: true });
      return res.status(200).json({ success: "Xóa thành công" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  deleteBillDeleted: async (req, res) => {
    try {
      const _id = req.params.id;
      const deleteBill = await Bill.findOneDeleted({ _id });
      const bill = await Bill.deleteOne({ _id });

      return res
        .status(200)
        .json({ success: "Đã xóa vĩnh viền hóa đơn thành công" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  restoreBill: async (req, res) => {
    try {
      const _id = req.params.id;
      const bill = await Bill.restore({ _id });
      return res.status(200).json({ success: "Khôi phục thành công" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  restoreSelectedBill: async (req, res) => {
    try {
      const _ids = req.body;
      await Bill.restore({ _id: { $in: _ids } });
      return res.status(200).json({ success: "Khôi phục thành công" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  restoreAllBill: async (req, res) => {
    try {
      const deletedBills = await Bill.findDeleted({ deleted: true });
      for (const bill of deletedBills) {
        bill.deleted = false;
        await bill.save();
      }
      return res.status(200).json({ success: "Khôi phục thành công" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  getPersonalBill: async (req, res) => {
    try {
      const userId = req.user.id;
      const bills = await Bill.find({ userId });
      res
        .status(200)
        .json({ success: "Lấy toàn bộ đơn hàng thành công", data: bills });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getAllBill: async (req, res) => {
    try {
      const bills = await Bill.find();
      res
        .status(200)
        .json({ success: "Lấy toàn bộ hoa don thành công", data: bills });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getAllBillDeleted: async (req, res) => {
    try {
      const billDeleted = await Bill.findDeleted({ deleted: true });
      return res
        .status(200)
        .json({ success: "lay hoa don da xoa thanh cong", data: billDeleted });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  cancellationBill: async (req, res) => {
    try {
      const user = await User.findById(req.user.id)
      const {status} = req.body
      const _id = req.params.id
      if(status !== 0 ) return res.status(403).json({error: "Vui lòng liên hệ người bán"})
      if(!user) return res.status(400).json({error: "Người dùng không tồn tại"})
      const bill = await Bill.findByIdAndUpdate(
        { _id },
        {
         status: 3
        }
      );
      if(bill){
        bill.order.map(item=>{
          sold(item.productId, item.color, item.size, -item.quantity)
        })
      }
      return res
        .status(200)
        .json({ success: "Huy don hang thanh cong", data: bill });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};
const sold = async (productId, colorName, sizeName, quantity) => {
  const product = await Product.findById(productId);
    if (!product) return res.status(404).json({error: "không tìm thấy sản phẩm"})

    
    const color = product.colors.find((c) => c.name === colorName);
    if (!color) return res.status(404).json({error: "Có lỗi xảy ra"})
    const size = color.sizes.find((s) => s.name === sizeName);
    if (!size) return res.status(404).json({error: "Có lỗi xảy ra"})

    
    if (quantity > size.quantity) {
      return res.status(404).json({error: "Không đủ số lượng"})
    }
    size.quantity -= quantity;
    await product.save();
};

module.exports = billController;
