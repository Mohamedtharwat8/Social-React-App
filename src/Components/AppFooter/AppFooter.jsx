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
    <Footer container className=" rounded-none   ">
      <div className="w-full text-center text-white">
        <FooterDivider />
        <FooterCopyright href="#" by="Tharwat™" year={2025} />
      </div>
    </Footer>
  );
}
