{ pkgs ? import <nixpkgs> {} }:
with pkgs;
let
    pkgs = import (builtins.fetchTarball {
        url = "https://github.com/NixOS/nixpkgs/archive/d86bcbb415938888e7f606d55c52689aec127f43.tar.gz";
    }) {};
in
mkShell {
    buildInputs = [ pkgs.hugo ];
}
