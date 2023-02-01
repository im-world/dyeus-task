import React from "react";
import ReactHtmlParser from 'react-html-parser';
import './style.css';
import './reset.css';



class HtmlComponent extends React.Component {
  render() {
    const html = `<!--Frontend for Bomb Money Summary Page-->
    <div class="translucent_box semi_bold" id="summary_top">
        <p id="title">Bomb Finance Summary</p>
        <hr>
        <div id="summary_top_flex1">
            <div id="holdings_lhs">
                <div style="overflow-x:auto;">
                    <table>
                        <tr id="table_header">
                            <th class="noborder"></th>
                            <th class="noborder"></th>
                            <th>Current Supply</th>
                            <th>Total Supply</th>
                            <th>Price</th>
                            <th></th>
                        </tr>
                        <tr class="table_holdings">
                            <td><div class="circ_frame"><img src="https://i.ibb.co/tpg5K64/black-bomb.png" class="table_symbol"></div></td>
                            <td class="regular">$BOMB</td>
                            <td>8.66M</td>
                            <td>60.9k</td>
                            <td>$0.24<br>1.05 BTCB</td>
                            <td><img src="https://i.ibb.co/kyxFdbX/metamask.png" class="metamask_symbol"></td>
                        </tr>
                        <tr class="table_holdings">
                            <td><div class="circ_frame"><img src="https://i.ibb.co/2qgkJjc/favicon.png" class="table_symbol"></div></td>
                            <td class="regular">$BSHARE</td>
                            <td>11.43k</td>
                            <td>8.49m</td>
                            <td>$300<br>13000 BTCB</td>
                            <td><img src="https://i.ibb.co/kyxFdbX/metamask.png" class="metamask_symbol"></td>
                        </tr>
                        <tr class="table_holdings">
                            <td class="noborder"><div class="circ_frame"><img src="https://i.ibb.co/p4KHjkq/bbond.png" class="table_symbol"></div></td>
                            <td class="regular noborder">$BBOND</td>
                            <td>20.00K</td>
                            <td>175k</td>
                            <td>$0.28<br>1.15 BTCB</td>
                            <td><img src="https://i.ibb.co/kyxFdbX/metamask.png" class="metamask_symbol"></td>
                        </tr>
                    </table>
                </div>
            </div>
            <div id="epoch_info" class="regular">
                <p class="bold_small">Current Epoch</p>
                <p class="bold_big">258</p>
                <hr>
                <p class="bold_big">03:38:36</p>
                <p class="bold_small">Next Epoch in</p>
                <hr>
                <p>Live TWAP: <span class="epoch_blue">1.17</span></p>
                <p>Live TVL: <span class="epoch_blue">$5,002,412</span></p>
                <p>Last Epoch TWAP: <span class="epoch_blue">1.22</span></p>
            </div>    
        </div>
    </div>
    <div id="col_2">
        <div id="col_2_lhs">
            <p id="text_link">Read Investment Strategy ></p>
            <button class="bold_big" id="invest">Invest Now</button>
            <div id="references">
                <button id="discord" href="https://discord.bomb.money"><i class="fa-brands fa-discord"></i> Chat on Discord</button>
                <button id="documentation" href="https://docs.bomb.money/"><i class="fa-solid fa-file-lines"></i> Read Docs</button>
            </div>
            <div class="translucent_box" id="boardroom">
                <div id="boardroom_top">
                    <div class="boardroom_head">
                        <img src="https://i.ibb.co/2qgkJjc/favicon.png" class="title_img">
                        <div class="boardroom_head_text">
                            <div id="boardroom_title">
                                <p class="bold_big">Boardroom</p>
                                <p class="tag_green">Recommended</p>
                            </div>
                            <div id="boardroom_caption">
                                <p class="regular">Stake BSHARE and earn BOMB every epoch</p>
                                <p class="regular">TVL: <span class="bold_small">$1,008,430</span></p>
                            </div>
                        </div>
                    </div>
                    <hr align="right">
                    <p class="regular">Total Staked: <img src="https://i.ibb.co/2qgkJjc/favicon.png" class="curr_symbol">7232</p>
                </div>
                <div class="boardroom_content">
                    <div style="overflow-x:auto;">
                        <table id="boardroom_table">
                            <tr class="regular">
                                <th class="stat_table_head">Daily Returns:</th>
                                <th class="stat_table_head">Your Stake:</th>
                                <th class="stat_table_head">Earned:</th>
                            </tr>
                            <tr>
                                <td class="bold_big stat_table_cell">2%</td>
                                <td class="bold_small stat_table_cell"><img src="https://i.ibb.co/2qgkJjc/favicon.png" class="curr_symbol">6.0000<br>
                                    <p class="semi_bold">≈ $1171.62</p></td>
                                <td class="bold_small stat_table_cell"><img src="https://i.ibb.co/tpg5K64/black-bomb.png" class="curr_symbol">1660.4<br>
                                        <p class="semi_bold">≈ $298.88</p></td>
                            </tr>
                        </table>
                    </div>
                    <div id="boardroom_buttons">
                        <div id="transaction_buttons">
                            <button class="circular">Deposit <i class="fa-solid fa-circle-arrow-up inv_icon"></i></button>
                            <button class="circular">Withdraw <i class="fa-solid fa-circle-arrow-down inv_icon"></i></button>
                        </div>
                        <button class="circular">Claim Rewards <img src="https://i.ibb.co/2qgkJjc/favicon.png" class="button_symbol"></button>                            
                    </div>
                </div>
            </div>
        </div>
        <div class="translucent_box" id="latest_news">
            <p class="bold_big" id="latest_news_text">Latest News</p>
        </div>
    </div>
    <div class="translucent_box" id="bomb_farms">
        <div id="farms_header">
            <div class="farms_title">
                <p class="bold_big" id="farms_main_title">Bomb Farms</p>
                <p class="regular">Stake your LP tokens in our farms to start earning $BSHARE</p>
            </div>
            <button class="circular">Claim All <img src="https://i.ibb.co/2qgkJjc/favicon.png" class="button_symbol"></button>
        </div>
        <div id="btcb_header">
            <img src="https://i.ibb.co/VwrdhL1/bomb-btc.png" class="title_img">
            <div id="btcb_header_text">
                <div id="btcb_title">
                    <p class="bold_big">BOMB-BTCB</p>
                    <p class="tag_green">Recommended</p>
                </div>
                <p class="regular">TVL: <span class="semi_bold">$1,008,430</span></p>
            </div>
        </div>
        <hr align="right">
        <div id="btcb_content" style="overflow-x:auto;">
            <table>
                <tr class="regular">
                    <th class="stat_table_head">Daily Returns:</th>
                    <th class="stat_table_head">Your Stake:</th>
                    <th class="stat_table_head">Earned:</th>
                </tr>
                <tr>
                    <td class="bold_big stat_table_cell">2%</td>
                    <td class="bold_small stat_table_cell"><img src="https://i.ibb.co/VwrdhL1/bomb-btc.png" class="curr_symbol">124.21<br>
                        <p class="semi_bold">≈ $1171.62</p></td>
                    <td class="bold_small stat_table_cell"><img src="https://i.ibb.co/2qgkJjc/favicon.png" class="curr_symbol">6.4413<br>
                            <p class="semi_bold">≈ $298.88</p></td>
                </tr>
            </table>
            <div>
                <button class="circular">Deposit <i class="fa-solid fa-circle-arrow-up inv_icon"></i></button>
                <button class="circular">Withdraw <i class="fa-solid fa-circle-arrow-down inv_icon"></i></button>
                <button class="circular">Claim Rewards <img src="https://i.ibb.co/2qgkJjc/favicon.png" class="button_symbol"></button>                            
            </div>
        </div>
        <hr class="hr_total">
        <div id="btcb_header">
            <img src="https://i.ibb.co/8XVxvrm/bshare-bnb.png" class="title_img">
            <div id="btcb_header_text">
                <div id="btcb_title">
                    <p class="bold_big">BSHARE-BNB</p>
                    <p class="tag_green">Recommended</p>
                </div>
                <p class="regular">TVL: <span class="semi_bold">$1,008,430</span></p>
            </div>
        </div>
        <hr align="right">
        <div id="btcb_content" style="overflow-x:auto;">
            <table>
                <tr class="regular">
                    <th class="stat_table_head">Daily Returns:</th>
                    <th class="stat_table_head">Your Stake:</th>
                    <th class="stat_table_head">Earned:</th>
                </tr>
                <tr>
                    <td class="bold_big stat_table_cell">2%</td>
                    <td class="bold_small stat_table_cell"><img src="https://i.ibb.co/8XVxvrm/bshare-bnb.png" class="curr_symbol">124.21<br>
                        <p class="semi_bold">≈ $1171.62</p></td>
                    <td class="bold_small stat_table_cell"><img src="https://i.ibb.co/2qgkJjc/favicon.png" class="curr_symbol">6.4413<br>
                            <p class="semi_bold">≈ $298.88</p></td>
                </tr>
            </table>
            <div>
                <button class="circular">Deposit <i class="fa-solid fa-circle-arrow-up inv_icon"></i></button>
                <button class="circular">Withdraw <i class="fa-solid fa-circle-arrow-down inv_icon"></i></button>
                <button class="circular">Claim Rewards <img src="https://i.ibb.co/2qgkJjc/favicon.png" class="button_symbol"></button>                                         
            </div>
        </div>
    </div>
    <div class="translucent_box" id="bonds">
        <div class="boardroom_head">
            <img src="https://i.ibb.co/p4KHjkq/bbond.png" class="title_img">
            <div class="boardroom_head_text">
                <p class="bold_big">Bonds</p>
                <p class="regular">BBOND can be purchased only on contraction periods, when TWAP of BOMB is below 1</p>
            </div>
        </div>  
        <div class="boardroom_content" style="overflow-x:auto;"> 
            <table>
                <tr class="regular">
                    <th class="stat_table_head">Current Price:</th>
                    <th class="stat_table_head">Available to Redeem:</th>
                </tr>
                <tr>
                    <td class="bold_small stat_table_cell">BBOND = 6.2872 BTCB</td>
                    <td class="bold_big stat_table_cell"><img src="https://i.ibb.co/tpg5K64/black-bomb.png" class="curr_symbol">456</td>
                </tr>
            </table>
            <div>
                <div class="bonds_item">
                    <p class="semi_bold">Purchase BBond<br><span class="regular">Bomb is over peg</span></p>
                    <button class="circular">Purchase <i class="fa-solid fa-cart-shopping"></i></button>
                </div>
                <hr id="mini_divider">
                <div class="bonds_item">
                    <p class="semi_bold">Redeem Bomb</p>
                    <button class="circular">Redeem <i class="fa-solid fa-circle-arrow-down inv_icon"></i></button>
                </div>
            </div>
        </div>  
    </div>`;
    return <div class="db_container">{ ReactHtmlParser(html) }</div>;
  }
}

export default HtmlComponent;
