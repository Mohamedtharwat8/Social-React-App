import {
  Footer,
  FooterBrand,
  FooterCopyright,
  FooterDivider,
  FooterLink,
  FooterLinkGroup,
} from "flowbite-react";

export default function AppFooter() {
  return (
    <Footer
      container
      className=" rounded-none   text-white border-gray-200 shadow-lg  bg-gray-900 "
    >
      <div className="w-full text-center text-white">
        <FooterDivider />
        <FooterCopyright href="#" by="Tharwat™" year={2025} />
      </div>
    </Footer>
  );
}
