import HomeIcon from "@mui/icons-material/Home";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "next/link";
import { useRouter } from "next/router";

const Breadcrumb = () => {
  const router = useRouter();
  const pathnames = router.asPath.split("/").filter((x) => x);
  return (
    <Breadcrumbs aria-label='breadcrumb'>
      {pathnames.length > 0 ? (
        <Link href='/'>
            Home
        </Link>
      ) : (
        <Typography>Home</Typography>
      )}
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;
        return isLast ? (
          <Typography key={name}>{name}</Typography>
        ) : (
          <Link key={name} href={routeTo}>{name}</Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default Breadcrumb;
