// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/WandryFi.sol";

contract DeployScript is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("VERIFIER_PRIVATE_KEY");
        address verifier = vm.addr(deployerPrivateKey);

        vm.startBroadcast(deployerPrivateKey);

        WandryFi wandryFi = new WandryFi(verifier);

        // Add initial destinations
        wandryFi.addDestination("Eiffel Tower", 48856614, 2352222, 30);
        wandryFi.addDestination("Colosseum", 41890251, 12492373, 35);
        wandryFi.addDestination("Machu Picchu", -13163068, -72545128, 80);
        wandryFi.addDestination("Great Wall of China", 40431908, 116570374, 70);
        wandryFi.addDestination("Taj Mahal", 27175015, 78042155, 50);
        wandryFi.addDestination("Petra", 30328459, 35444362, 75);
        wandryFi.addDestination("Christ the Redeemer", -22951916, -43210487, 45);
        wandryFi.addDestination("Santorini", 36393156, 25461509, 40);
        wandryFi.addDestination("Grand Canyon", 36106965, -112112997, 55);
        wandryFi.addDestination("Sydney Opera House", -33856784, 151215297, 60);

        vm.stopBroadcast();

        console.log("WandryFi deployed at:", address(wandryFi));
        console.log("JourneyNFT deployed at:", address(wandryFi.journeyNFT()));
    }
}
