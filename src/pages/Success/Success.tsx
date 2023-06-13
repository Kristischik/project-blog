import React from "react";

import FormPagesContainer from "../../components/FormPagesContainer";

const Success = () => {
    return (
        <FormPagesContainer
            title={"Success"}
            btnTitle={"Go to home"}
            onSubmit={() => {}}
        >
            <div>
                {
                    "Email confirmed.\n Your registration is now completed"
                }
            </div>
        </FormPagesContainer>
    );
};

export default Success;