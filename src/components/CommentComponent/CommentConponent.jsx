import React from "react";

const CommentComponent = (props) => {
    const { dataHref, width } = props;

    return (
        <div style={{ marginTop: "30px" }}>
            <div
                class="fb-comments"
                data-href={dataHref}
                data-width={width}
                data-numposts="3"
            ></div>
        </div>
    );
};

export default CommentComponent;
