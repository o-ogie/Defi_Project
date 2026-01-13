// // SPDX-License-Identifier: MIT

// pragma solidity ^0.8.0;

// import "./SelfMath.sol";
// import "./SelfToken.sol";

// contract Airdrop {
//     using SelfMath for uint;
//     address owner;
//     address factory;
//     address myaddress;

//     mapping(uint256 => address) private dropTokens;
//     mapping(address => mapping(uint256 => bool)) private userInfo;

//     constructor() {
//         myaddress = address(this);
//     }

//     function div(uint256 x, uint256 y) public pure returns (uint256) {
//         require(y != 0);
//         uint256 c = (x * 10 ** 18) / y;
//         return uint256(c);
//     }

//     function doAirdrop(
//         address _accounts,
//         address _lptoken,
//         uint256 _PK
//     ) public {
//         // require(msg.sender == owner, "only Gov");
//         // require(userInfo[_accounts][_PK] == false);
//         address _droptoken = dropTokens[_PK];
//         uint256 _tokenBalance = SelfToken(_droptoken).balanceOf(_droptoken);
//         require(_tokenBalance > 0);
//         uint256 _allowance = SelfToken(_droptoken).allowance(
//             _droptoken,
//             myaddress
//         );
//         require(_allowance > 0);
//         uint256 _lpTotalAmount = SelfToken(_lptoken).totalSupply();

//         uint256 _balance = SelfToken(_lptoken).balanceOf(_accounts);
//         uint256 _percent = (_balance * 1000) / _lpTotalAmount;
//         uint256 _amounts = (_allowance * _percent) / 1000;
//         SelfToken(_droptoken).transferFrom(_droptoken, _accounts, _amounts);
//         userInfo[_accounts][_PK] = true;
//     }

//     function checkTokenBalance(
//         address _droptoken
//     ) public view returns (uint256) {
//         uint256 tokenBalance = SelfToken(_droptoken).balanceOf(_droptoken);
//         require(tokenBalance > 0);
//         return tokenBalance;
//     }

//     function setToken(uint256 _PK, address _token) public {
//         dropTokens[_PK] = _token;
//     }

//     function getToken(uint256 _PK) public view returns (address) {
//         return dropTokens[_PK];
//     }

//     function deployaddress() public view returns (address) {
//         return address(this);
//     }
// }

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract Airdrop is Ownable, Pausable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    IERC20 public governanceToken;
    mapping(address => bool) public claimed;

    constructor(IERC20 _governanceToken, address _owner) {
        governanceToken = _governanceToken;
        transferOwnership(_owner);  
    }

    function airdrop(address[] memory recipients, uint256[] memory amounts) external onlyOwner whenNotPaused nonReentrant {
        require(recipients.length == amounts.length, "Recipients and amounts array length should be same");
        for(uint256 i=0; i<recipients.length; i++){
            require(!claimed[recipients[i]], "Address has already claimed the airdrop");
            claimed[recipients[i]] = true;
            governanceToken.safeTransfer(recipients[i], amounts[i]);
        }
    }
}