import { Steps } from "antd";
import React from "react";

const StepComponent = ({ current = 0, items = [] }) => {
    const { Step } = Steps;

    return (
        <div>
            <Steps current={current} items={items}>
                {items.map((item, index) => {
                    return (
                        <Step
                            key={index}
                            title={item.title}
                            description={item.description}
                        />
                    );
                })}
            </Steps>
        </div>
    );
};

export default StepComponent;
