import type {
  ILoadingForwardHandles,
  ILoadingProps,
} from "@/interfaces/components/Loading";
import { forwardRef, useImperativeHandle, useState } from "react";

export const Loading = forwardRef<ILoadingForwardHandles, ILoadingProps>(
  ({ defaultDescription = "Loading...", isLoading }, ref) => {
    const [isVisible, setIsVisible] = useState(isLoading);
    const [description, setDescription] = useState<string | React.ReactNode>(
      defaultDescription
    );

    const show = (newDescription?: React.ReactNode) => {
      setIsVisible(true);
      setDescription(newDescription || defaultDescription);
    };
    const hide = () => {
      setIsVisible(false);
    };
    useImperativeHandle(ref, () => ({
      show,
      hide,
    }));
    return (
      isVisible && (
        <div
          className="bg-tertiary bg-opacity-75 gap-3 loader-page cursor-wait"
          role="status"
        >
          {/* <LoadSVG width={320} heigth={127} logoOnly /> */}
          <span className="mt-3 loader-description fs-4 semibold">
            {description}
          </span>
        </div>
      )
    );
  }
);

Loading.displayName = "Loading";
