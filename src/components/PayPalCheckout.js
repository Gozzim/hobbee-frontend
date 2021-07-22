import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { connect } from "react-redux";
import { sendPremiumRequest } from "../services/paymentService";
import { withRouter } from "react-router-dom";

const initialOptions = {
    "client-id": "AU7zuQUIr6Py3Vyt85-b8wASl7rWeaaoTc1ETAAx0xM7PUygJoVmxGDkPEzSC8obakqZ7C8y976kbZrM",
    vault: true,
    intent: "subscription",
    currency: "EUR",
};

function PayPalCheckout(props) {

    const onApprove = async (order) => {
        try {
            const receipt = await sendPremiumRequest(order);
            props.onSuccess(receipt);
        } catch (e) {
            console.log(e)
        }
    };

    const onCancel = () => {
        return (<Snackbar autoHideDuration={6000}>
            <Alert severity="error">
                The checkout process was canceled!
            </Alert>
        </Snackbar>)
    };

    const onError = () => {
        return (<Snackbar autoHideDuration={6000}>
            <Alert severity="error">
                There was an issue during your checkout process!
            </Alert>
        </Snackbar>)
    };

    return (
        <PayPalScriptProvider options={initialOptions}>
            <PayPalButtons
                style={{ layout: "horizontal", label: "pay", tagline: false }}
                createSubscription={(data, actions) => {
                    return actions.subscription.create({
                        plan_id: props.planId
                    });
                }}
                onApprove={onApprove}
                onCancel={onCancel}
                onError={onError}
                forceReRender={[props.planId]}
            />
        </PayPalScriptProvider>
    );
}

export default connect()(withRouter(PayPalCheckout));