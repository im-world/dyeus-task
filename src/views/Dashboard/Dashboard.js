import React from "react";
import ReactHtmlParser from 'react-html-parser';
import './style.css';
import './reset.css';

import useCurrentEpoch from '../../hooks/useCurrentEpoch';
import ProgressCountdown from '../Boardroom/components/ProgressCountdown';
import moment from 'moment';
import useTreasuryAllocationTimes from '../../hooks/useTreasuryAllocationTimes';

const HtmlComponent = () => {
    const currentEpoch = useCurrentEpoch();
    const { to } = useTreasuryAllocationTimes();
    
    return(<div>
        {/*Frontend for Bomb Money Summary Page*/}
        <div className="translucent_box semi_bold" id="summary_top">
          <p id="title">Bomb Finance Summary</p>
          <hr />
          <div id="summary_top_flex1">
            <div id="holdings_lhs">
              <div style={{"overflowX":"auto"}}>
                <table>
                  <tbody><tr id="table_header">
                      <th className="noborder" />
                      <th className="noborder" />
                      <th>Current Supply</th>
                      <th>Total Supply</th>
                      <th>Price</th>
                      <th />
                    </tr>
                    <tr className="table_holdings">
                      <td><div className="circ_frame"><img src="https://s2.coinmarketcap.com/static/img/coins/200x200/15876.png" className="table_symbol" /></div></td>
                      <td className="regular">$BOMB</td>
                      <td>8.66M</td>
                      <td>60.9k</td>
                      <td>$0.24<br />1.05 BTCB</td>
                      <td><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/1200px-MetaMask_Fox.svg.png" className="metamask_symbol" /></td>
                    </tr>
                    <tr className="table_holdings">
                      <td><div className="circ_frame"><img src="https://s2.coinmarketcap.com/static/img/coins/200x200/15933.png" className="table_symbol" /></div></td>
                      <td className="regular">$BSHARE</td>
                      <td>11.43k</td>
                      <td>8.49m</td>
                      <td>$300<br />13000 BTCB</td>
                      <td><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/1200px-MetaMask_Fox.svg.png" className="metamask_symbol" /></td>
                    </tr>
                    <tr className="table_holdings">
                      <td className="noborder"><div className="circ_frame"><img src="https://app.bomb.money/static/media/bbond.6a97acfd.png" className="table_symbol" /></div></td>
                      <td className="regular noborder">$BBOND</td>
                      <td>20.00K</td>
                      <td>175k</td>
                      <td>$0.28<br />1.15 BTCB</td>
                      <td><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/1200px-MetaMask_Fox.svg.png" className="metamask_symbol" /></td>
                    </tr>
                  </tbody></table>
              </div>
            </div>
            <div id="epoch_info" className="regular">
              <p className="bold_small">Current Epoch</p>
              <p className="bold_big">{Number(currentEpoch)}</p>
              <hr />
              <p className="bold_big"><ProgressCountdown base={moment().toDate()} hideBar={true} deadline={to} description="Next Epoch" /></p>
              <p className="bold_small">Next Epoch in</p>
              <hr />
              <p>Live TWAP: <span className="epoch_blue">1.17</span></p>
              <p>Live TVL: <span className="epoch_blue">$5,002,412</span></p>
              <p>Last Epoch TWAP: <span className="epoch_blue">1.22</span></p>
            </div>    
          </div>
        </div>
        <div id="col_2">
          <div id="col_2_lhs">
            <p id="text_link">Read Investment Strategy &gt;</p>
            <button className="bold_big" id="invest">Invest Now</button>
            <div id="references">
              <button id="discord" href="https://discord.bomb.money"><i className="fa-brands fa-discord" /> Chat on Discord</button>
              <button id="documentation" href="https://docs.bomb.money/"><i className="fa-solid fa-file-lines" /> Read Docs</button>
            </div>
            <div className="translucent_box" id="boardroom">
              <div id="boardroom_top">
                <div className="boardroom_head">
                  <img src="https://s2.coinmarketcap.com/static/img/coins/200x200/15933.png" className="title_img" />
                  <div className="boardroom_head_text">
                    <div id="boardroom_title">
                      <p className="bold_big">Boardroom</p>
                      <p className="tag_green">Recommended</p>
                    </div>
                    <div id="boardroom_caption">
                      <p className="regular">Stake BSHARE and earn BOMB every epoch</p>
                      <p className="regular">TVL: <span className="bold_small">$1,008,430</span></p>
                    </div>
                  </div>
                </div>
                <hr align="right" />
                <p className="regular">Total Staked: <img src="https://s2.coinmarketcap.com/static/img/coins/200x200/15933.png" className="curr_symbol" />7232</p>
              </div>
              <div className="boardroom_content">
                <div style={{"overflowX":"auto"}}>
                  <table id="boardroom_table">
                    <tbody><tr className="regular">
                        <th className="stat_table_head">Daily Returns:</th>
                        <th className="stat_table_head">Your Stake:</th>
                        <th className="stat_table_head">Earned:</th>
                      </tr>
                      <tr>
                        <td className="bold_big stat_table_cell">2%</td>
                        <td className="bold_small stat_table_cell"><img src="https://s2.coinmarketcap.com/static/img/coins/200x200/15933.png" className="curr_symbol" />6.0000<br />
                          <p className="semi_bold">≈ $1171.62</p></td>
                        <td className="bold_small stat_table_cell"><img src="https://s2.coinmarketcap.com/static/img/coins/200x200/15876.png" className="curr_symbol" />1660.4<br />
                          <p className="semi_bold">≈ $298.88</p></td>
                      </tr>
                    </tbody></table>
                </div>
                <div id="boardroom_buttons">
                  <div id="transaction_buttons">
                    <button className="circular">Deposit <i className="fa-solid fa-circle-arrow-up inv_icon" /></button>
                    <button className="circular">Withdraw <i className="fa-solid fa-circle-arrow-down inv_icon" /></button>
                  </div>
                  <button className="circular">Claim Rewards <img src="https://s2.coinmarketcap.com/static/img/coins/200x200/15933.png" className="button_symbol" /></button>                            
                </div>
              </div>
            </div>
          </div>
          <div className="translucent_box" id="latest_news">
            <p className="bold_big" id="latest_news_text">Latest News</p>
          </div>
        </div>
        <div className="translucent_box" id="bomb_farms">
          <div id="farms_header">
            <div className="farms_title">
              <p className="bold_big" id="farms_main_title">Bomb Farms</p>
              <p className="regular">Stake your LP tokens in our farms to start earning $BSHARE</p>
            </div>
            <button className="circular">Claim All <img src="https://s2.coinmarketcap.com/static/img/coins/200x200/15933.png" className="button_symbol" /></button>
          </div>
          <div id="btcb_header">
            <img src="https://app.bomb.money/static/media/bomb-bitcoin-LP.084590b2.png" className="title_img" />
            <div id="btcb_header_text">
              <div id="btcb_title">
                <p className="bold_big">BOMB-BTCB</p>
                <p className="tag_green">Recommended</p>
              </div>
              <p className="regular">TVL: <span className="semi_bold">$1,008,430</span></p>
            </div>
          </div>
          <hr align="right" />
          <div id="btcb_content" style={{"overflowX":"auto"}}>
            <table>
              <tbody><tr className="regular">
                  <th className="stat_table_head">Daily Returns:</th>
                  <th className="stat_table_head">Your Stake:</th>
                  <th className="stat_table_head">Earned:</th>
                </tr>
                <tr>
                  <td className="bold_big stat_table_cell">2%</td>
                  <td className="bold_small stat_table_cell"><img src="https://app.bomb.money/static/media/bomb-bitcoin-LP.084590b2.png" className="curr_symbol" />124.21<br />
                    <p className="semi_bold">≈ $1171.62</p></td>
                  <td className="bold_small stat_table_cell"><img src="https://s2.coinmarketcap.com/static/img/coins/200x200/15933.png" className="curr_symbol" />6.4413<br />
                    <p className="semi_bold">≈ $298.88</p></td>
                </tr>
              </tbody></table>
            <div>
              <button className="circular">Deposit <i className="fa-solid fa-circle-arrow-up inv_icon" /></button>
              <button className="circular">Withdraw <i className="fa-solid fa-circle-arrow-down inv_icon" /></button>
              <button className="circular">Claim Rewards <img src="https://s2.coinmarketcap.com/static/img/coins/200x200/15933.png" className="button_symbol" /></button>                            
            </div>
          </div>
          <hr className="hr_total" />
          <div id="btcb_header">
            <img src="https://app.bomb.money/static/media/bshare-bnb-LP.9144444a.png" className="title_img" />
            <div id="btcb_header_text">
              <div id="btcb_title">
                <p className="bold_big">BSHARE-BNB</p>
                <p className="tag_green">Recommended</p>
              </div>
              <p className="regular">TVL: <span className="semi_bold">$1,008,430</span></p>
            </div>
          </div>
          <hr align="right" />
          <div id="btcb_content" style={{"overflowX":"auto"}}>
            <table>
              <tbody><tr className="regular">
                  <th className="stat_table_head">Daily Returns:</th>
                  <th className="stat_table_head">Your Stake:</th>
                  <th className="stat_table_head">Earned:</th>
                </tr>
                <tr>
                  <td className="bold_big stat_table_cell">2%</td>
                  <td className="bold_small stat_table_cell"><img src="https://app.bomb.money/static/media/bshare-bnb-LP.9144444a.png" className="curr_symbol" />124.21<br />
                    <p className="semi_bold">≈ $1171.62</p></td>
                  <td className="bold_small stat_table_cell"><img src="https://s2.coinmarketcap.com/static/img/coins/200x200/15933.png" className="curr_symbol" />6.4413<br />
                    <p className="semi_bold">≈ $298.88</p></td>
                </tr>
              </tbody></table>
            <div>
              <button className="circular">Deposit <i className="fa-solid fa-circle-arrow-up inv_icon" /></button>
              <button className="circular">Withdraw <i className="fa-solid fa-circle-arrow-down inv_icon" /></button>
              <button className="circular">Claim Rewards <img src="https://s2.coinmarketcap.com/static/img/coins/200x200/15933.png" className="button_symbol" /></button>                                         
            </div>
          </div>
        </div>
        <div className="translucent_box" id="bonds">
          <div className="boardroom_head">
            <img src="https://app.bomb.money/static/media/bbond.6a97acfd.png" className="title_img" />
            <div className="boardroom_head_text">
              <p className="bold_big">Bonds</p>
              <p className="regular">BBOND can be purchased only on contraction periods, when TWAP of BOMB is below 1</p>
            </div>
          </div>  
          <div className="boardroom_content" style={{"overflowX":"auto"}}> 
            <table>
              <tbody><tr className="regular">
                  <th className="stat_table_head">Current Price:</th>
                  <th className="stat_table_head">Available to Redeem:</th>
                </tr>
                <tr>
                  <td className="bold_small stat_table_cell">BBOND = 6.2872 BTCB</td>
                  <td className="bold_big stat_table_cell"><img src="https://s2.coinmarketcap.com/static/img/coins/200x200/15876.png" className="curr_symbol" />456</td>
                </tr>
              </tbody></table>
            <div>
              <div className="bonds_item">
                <p className="semi_bold">Purchase BBond<br /><span className="regular">Bomb is over peg</span></p>
                <button className="circular">Purchase <i className="fa-solid fa-cart-shopping" /></button>
              </div>
              <hr id="mini_divider" />
              <div className="bonds_item">
                <p className="semi_bold">Redeem Bomb</p>
                <button className="circular">Redeem <i className="fa-solid fa-circle-arrow-down inv_icon" /></button>
              </div>
            </div>
          </div>  
        </div>
      </div>);
}

//document.querySelector("#current_epoch").textContent = "Hello";

export default HtmlComponent;
