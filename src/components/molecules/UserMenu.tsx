import Image from "next/image";
import React from "react";

interface UserMenuProps {
 children?: React.ReactNode;
}

export function UserMenu(props: UserMenuProps) {
 return <div className="">{props.children}</div>;
}

const Icon = () => {
 const defaultImage = "/images/image-avatar.png";
 return <Image src={defaultImage} height={40} width={40} alt="user avatar" />;
};

UserMenu.Icon = Icon;
