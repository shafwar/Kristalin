{ pkgs }: {
  deps = [
    pkgs.php82
    pkgs.php82Packages.composer
    pkgs.nodejs-18_x
    pkgs.nodePackages.npm
    pkgs.git
    pkgs.sqlite
  ];
}
