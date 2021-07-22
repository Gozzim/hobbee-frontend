import CircularProgress from "@material-ui/core/CircularProgress";
import React from "react";

export function PageLoadingComponent () {
    return (
        <div style={{width: "100%", height: "100%"}}>
            <div style={{width: "40px", margin: "150px auto",}}>
                <CircularProgress color={"inherit"}/>
            </div>
        </div>
    );
}