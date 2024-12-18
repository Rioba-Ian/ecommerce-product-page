import Image from "next/image";
import React from "react";

interface UserMenuProps {
 children?: React.ReactNode;
}

export function UserMenu(props: UserMenuProps) {
 return <div className="">{props.children}</div>;
}

interface UserIconProps {
 imageUrl: string | undefined;
}

const Icon = (props: UserIconProps) => {
 const defaultImage =
  "https://rioba-dev.sirv.com/sneakers-ecommerce/image-avatar.png";
 const { imageUrl } = props;
 return (
  <Image
   src={imageUrl ?? defaultImage}
   height={40}
   width={40}
   className="rounded-full"
   alt="user avatar"
  />
 );
};

UserMenu.Icon = Icon;
