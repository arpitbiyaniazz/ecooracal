
const AppFooter = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="py-6 px-4 md:px-8 border-t border-border/80 mt-12 bg-background/80">
      <div className="container mx-auto text-center text-muted-foreground text-sm">
        <p className="font-body">&copy; {currentYear} EcoOracle. Live sustainably, wisely.</p> {/* Changed name and tagline */}
        <p className="font-body mt-1">Powered by AI for a greener future.</p>
      </div>
    </footer>
  );
};

export default AppFooter;
