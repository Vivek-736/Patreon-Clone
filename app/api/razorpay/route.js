import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import payment from "@/models/payment";
import connectDB from "@/db/connectDb";

export const POST = async (req) => {
    await connectDB();
    try {
        let body = await req.formData();
        body = Object.fromEntries(body);

        // Check if razorpayId is present on the server
        let p = await payment.findOne({ oid: body.razorpay_order_id });
        if (!p) {
            return NextResponse.json({ success: false, message: "Payment not found" });
        }

        // // fetch the secret of the user who is getting the payment
        // let user = await User.findOne({username:to_user})
        // const secret = user.razorpay


        // Verify the payment
        let isValid = validatePaymentVerification(
            { order_id: body.razorpay_order_id, payment_id: body.razorpay_payment_id },
            body.razorpay_signature,
            process.env.KEY_SECRET
        );

        if (isValid) {
            // Update payment status correctly using order_id (not payment_id)
            const updatedPayment = await payment.findOneAndUpdate(
                { oid: body.razorpay_order_id },
                { done: true }, // Updating done field to true
                { new: true }
            );

            return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/${updatedPayment.to_user}?paymentdone=true`);
        } else {
            return NextResponse.json({ success: false, message: "Payment verification failed" });
        }
    } catch (error) {
        return NextResponse.json({ success: false, message: "Server error", error: error.message });
    }
};
