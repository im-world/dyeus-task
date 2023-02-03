//imports
import React, { useMemo, useCallback } from 'react';
import './style.css';
import './reset.css';

import useCurrentEpoch from '../../hooks/useCurrentEpoch';
import ProgressCountdown from '../Boardroom/components/ProgressCountdown';
import moment from 'moment';
import useTreasuryAllocationTimes from '../../hooks/useTreasuryAllocationTimes';
import useCashPriceInEstimatedTWAP from '../../hooks/useCashPriceInEstimatedTWAP';
import useTotalStakedOnBoardroom from '../../hooks/useTotalStakedOnBoardroom';
import { getDisplayBalance } from '../../utils/formatBalance';
import useFetchBoardroomAPR from '../../hooks/useFetchBoardroomAPR';
import useStakedBalanceOnBoardroom from '../../hooks/useStakedBalanceOnBoardroom';
import useStakedTokenPriceInDollars from '../../hooks/useStakedTokenPriceInDollars';
import useEarningsOnBoardroom from '../../hooks/useEarningsOnBoardroom';
import useApprove, {ApprovalState} from '../../hooks/useApprove';
import useWithdrawCheck from '../../hooks/boardroom/useWithdrawCheck';
import useClaimRewardCheck from '../../hooks/boardroom/useClaimRewardCheck';
import useRedeemOnBoardroom from '../../hooks/useRedeemOnBoardroom';
import useHarvestFromBoardroom from '../../hooks/useHarvestFromBoardroom';

import useBombStats from '../../hooks/useBombStats';
import useBondStats from '../../hooks/useBondStats';
import usebShareStats from '../../hooks/usebShareStats';
import useTotalValueLocked from '../../hooks/useTotalValueLocked';
import { roundAndFormatNumber } from '../../0x';
import useBombFinance from '../../hooks/useBombFinance';
import CountUp from 'react-countup';

import useCashPriceInLastTWAP from '../../hooks/useCashPriceInLastTWAP';
import useBondsPurchasable from '../../hooks/useBondsPurchasable';
import { BOND_REDEEM_PRICE_BN } from '../../bomb-finance/constants';
import {useTransactionAdder} from '../../state/transactions/hooks';
import useTokenBalance from '../../hooks/useTokenBalance';


const HtmlComponent = () => {
    //General
    const currentEpoch = useCurrentEpoch();
    const { to } = useTreasuryAllocationTimes();
    const bombFinance = useBombFinance();

    //Bomb stats
    const bombStats = useBombStats();
    const bombPriceInDollars = useMemo(
        () => (bombStats ? Number(bombStats.priceInDollars).toFixed(2) : null),
        [bombStats],
    );
    const bombPriceInBNB = useMemo(() => (bombStats ? Number(bombStats.tokenInFtm).toFixed(4) : null), [bombStats]);
    const bombCirculatingSupply = useMemo(() => (bombStats ? String(bombStats.circulatingSupply) : null), [bombStats]);
    const bombTotalSupply = useMemo(() => (bombStats ? String(bombStats.totalSupply) : null), [bombStats]);

    //BShare stats
    const bShareStats = usebShareStats();
    const bSharePriceInDollars = useMemo(
        () => (bShareStats ? Number(bShareStats.priceInDollars).toFixed(2) : null),
        [bShareStats],
    );
    const bSharePriceInBNB = useMemo(
        () => (bShareStats ? Number(bShareStats.tokenInFtm).toFixed(4) : null),
        [bShareStats],
    );
    const bShareCirculatingSupply = useMemo(
        () => (bShareStats ? String(bShareStats.circulatingSupply) : null),
        [bShareStats],
    );
    const bShareTotalSupply = useMemo(() => (bShareStats ? String(bShareStats.totalSupply) : null), [bShareStats]);

    //Bond stats
    const tBondStats = useBondStats();
    const tBondPriceInDollars = useMemo(
        () => (tBondStats ? Number(tBondStats.priceInDollars).toFixed(2) : null),
        [tBondStats],
    );
    const tBondPriceInBNB = useMemo(() => (tBondStats ? Number(tBondStats.tokenInFtm).toFixed(4) : null), [tBondStats]);
    const tBondCirculatingSupply = useMemo(
        () => (tBondStats ? String(tBondStats.circulatingSupply) : null),
        [tBondStats],
    );
    const tBondTotalSupply = useMemo(() => (tBondStats ? String(tBondStats.totalSupply) : null), [tBondStats]);  
    const isBondPurchasable = useMemo(() => Number(tBondStats?.tokenInFtm) < 1.01, [tBondStats]);
    const bondsPurchasable = useBondsPurchasable();
    const addTransaction = useTransactionAdder();
    const handleBuyBonds = useCallback(
        async (amount) => {
          const tx = await bombFinance.buyBonds(amount);
          addTransaction(tx, {
            summary: `Buy ${Number(amount).toFixed(2)} BBOND with ${amount} BOMB`,
          });
        },
        [bombFinance, addTransaction],
    );
    const handleRedeemBonds = useCallback(
        async (amount) => {
          const tx = await bombFinance.redeemBonds(amount);
          addTransaction(tx, {summary: `Redeem ${amount} BBOND`});
        },
        [bombFinance, addTransaction],
    );
    const bondBalance = useTokenBalance(bombFinance?.BBOND);

    //Aggregate stats
    const TVL = useTotalValueLocked();
    const cashStat = useCashPriceInEstimatedTWAP();
    const scalingFactor = useMemo(() => (cashStat ? Number(cashStat.priceInDollars).toFixed(4) : null), [cashStat]);
    const cashPrice = useCashPriceInLastTWAP();
    const scalingFactor2 = useMemo(() => (cashPrice ? Number(cashPrice.priceInDollars).toFixed(4) : null), [cashPrice]);
    const isBondRedeemable = useMemo(() => cashPrice.gt(BOND_REDEEM_PRICE_BN), [cashPrice]);

    //Boardroom
    const totalStaked = useTotalStakedOnBoardroom();
    const boardroomAPR = useFetchBoardroomAPR();
    const stakedBalance = useStakedBalanceOnBoardroom();
    const stakedTokenPriceInDollars = useStakedTokenPriceInDollars('BSHARE', bombFinance.BSHARE);
    const tokenPriceInDollars = useMemo(
      () =>
        stakedTokenPriceInDollars
          ? (Number(stakedTokenPriceInDollars) * Number(getDisplayBalance(stakedBalance))).toFixed(2).toString()
          : null,
        [stakedTokenPriceInDollars, stakedBalance],
    );
    const earnings = useEarningsOnBoardroom();
    const tokenPriceInDollarsEarned = useMemo(
        () => (bombStats ? Number(bombStats.priceInDollars).toFixed(2) : null),
        [bombStats],
    );
    const earnedInDollars = (Number(tokenPriceInDollarsEarned) * Number(getDisplayBalance(earnings))).toFixed(2);

    //Boardroom Buttons
    const [approveStatus, approve] = useApprove(bombFinance.BSHARE, bombFinance.contracts.Boardroom.address);
    const canWithdraw = useWithdrawCheck();
    const canClaimReward = useClaimRewardCheck();
    const { onRedeem } = useRedeemOnBoardroom();
    const {onReward} = useHarvestFromBoardroom();

    return(<div>
        {/*Frontend for Bomb Money Summary Page*/}
        <div className="translucent_box semi_bold" id="summary_top">
          <p id="title">Bomb Finance Summary</p>
          <hr />
          <div id="summary_top_flex1">
            <div id="holdings_lhs">
              <div className="table_container" style={{"overflowX":"auto"}}>
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
                      <td><div className="circ_frame"><img src="https://s2.coinmarketcap.com/static/img/coins/200x200/15876.png" className="table_symbol" alt="" /></div></td>
                      <td className="regular">$BOMB</td>
                      <td>{ roundAndFormatNumber(bombCirculatingSupply, 2) }</td>
                      <td>{ roundAndFormatNumber(bombTotalSupply, 2) }</td>
                      <td>${ bombPriceInDollars ? roundAndFormatNumber(bombPriceInDollars, 2) : '-.--' }<br />{ bombPriceInBNB ? bombPriceInBNB : '-.----' } BTC</td>
                      <td><img onClick={() => {
                            bombFinance.watchAssetInMetamask('BOMB');
                            }} src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/1200px-MetaMask_Fox.svg.png" className="metamask_symbol" alt="" /></td>
                    </tr>
                    <tr className="table_holdings">
                      <td><div className="circ_frame"><img src="https://s2.coinmarketcap.com/static/img/coins/200x200/15933.png" className="table_symbol" alt="" /></div></td>
                      <td className="regular">$BSHARE</td>
                      <td>{ roundAndFormatNumber(bShareCirculatingSupply, 2) }</td>
                      <td>{ roundAndFormatNumber(bShareTotalSupply, 2) }</td>
                      <td>${ bSharePriceInDollars ? bSharePriceInDollars : '-.--' }<br />{ bSharePriceInBNB ? bSharePriceInBNB : '-.----' } BNB</td>
                      <td><img onClick={() => {
                            bombFinance.watchAssetInMetamask('BOMB');
                            }} src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/1200px-MetaMask_Fox.svg.png" className="metamask_symbol" alt="" /></td>
                    </tr>
                    <tr className="table_holdings">
                      <td className="noborder"><div className="circ_frame"><img src="https://app.bomb.money/static/media/bbond.6a97acfd.png" className="table_symbol" alt="" /></div></td>
                      <td className="regular noborder">$BBOND</td>
                      <td>{ roundAndFormatNumber(tBondCirculatingSupply, 2) }</td>
                      <td>{ roundAndFormatNumber(tBondTotalSupply, 2) }</td>
                      <td>${ tBondPriceInDollars ? tBondPriceInDollars : '-.--' }<br />{ tBondPriceInBNB ? tBondPriceInBNB : '-.----' } BTC</td>
                      <td><img onClick={() => {
                            bombFinance.watchAssetInMetamask('BOMB');
                            }} src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/1200px-MetaMask_Fox.svg.png" className="metamask_symbol" alt="" /></td>
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
              <p>Live TWAP: <span className="epoch_blue">{ scalingFactor } BTC</span></p>
              <p>Live TVL: <span className="epoch_blue"><CountUp end={TVL} separator="," prefix="$" /></span></p>
              <p>Last Epoch TWAP: <span className="epoch_blue">{ scalingFactor2 } BTC</span></p>
            </div>    
          </div>
        </div>
        <div id="col_2">
          <div id="col_2_lhs">
            <p id="text_link"><a href="https://bombbshare.medium.com/the-bomb-cycle-how-to-print-forever-e89dc82c12e5">Read Investment Strategy &gt;</a></p>
            <button className="bold_big" id="invest">Invest Now</button>
            <div id="references">
              <button id="discord"><a href="https://discord.bomb.money"><i className="fa-brands fa-discord" /> Chat on Discord</a></button>
              <button id="documentation"><a href="https://docs.bomb.money/"><i className="fa-solid fa-file-lines" /> Read Docs</a></button>
            </div>
            {/*Boardroom Section*/}
            <div className="translucent_box" id="boardroom">
              <div id="boardroom_top">
                <div className="boardroom_head">
                  <img src="https://s2.coinmarketcap.com/static/img/coins/200x200/15933.png" className="title_img" alt="" />
                  <div className="boardroom_head_text">
                    <div id="boardroom_title">
                      <p className="bold_big">Boardroom</p>
                      <p className="tag_green">Recommended</p>
                    </div>
                    <div id="boardroom_caption">
                      <p className="regular">Stake BSHARE and earn BOMB every epoch</p>
                      <p className="regular">TVL: <span className="bold_small">{ TVL }</span></p>
                    </div>
                  </div>
                </div>
                <hr align="right" />
                <p className="regular">Total Staked: <img src="https://s2.coinmarketcap.com/static/img/coins/200x200/15933.png" className="curr_symbol" alt="" />{ getDisplayBalance(totalStaked) }</p>
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
                        <td className="bold_big stat_table_cell">{ boardroomAPR.toFixed(2) }%</td>
                        <td className="bold_small stat_table_cell"><img src="https://s2.coinmarketcap.com/static/img/coins/200x200/15933.png" className="curr_symbol" alt="" />{ getDisplayBalance(stakedBalance) }<br />
                          <p className="semi_bold">{ `≈ $${tokenPriceInDollars}` }</p></td>
                        <td className="bold_small stat_table_cell"><img src="https://s2.coinmarketcap.com/static/img/coins/200x200/15876.png" className="curr_symbol" alt="" />{ getDisplayBalance(earnings) }<br />
                          <p className="semi_bold">{ `≈ $${earnedInDollars}` }</p></td>
                      </tr>
                    </tbody></table>
                </div>
                <div id="boardroom_buttons">
                  <div id="transaction_buttons">
                    <button className="circular" 
                        disabled={approveStatus !== ApprovalState.NOT_APPROVED}
                        onClick={approve}>Deposit <i className="fa-solid fa-circle-arrow-up inv_icon" /></button>
                    <button className="circular" 
                        disabled={stakedBalance.eq(0) || (!canWithdraw && !canClaimReward)}
                        onClick={onRedeem}>Withdraw <i className="fa-solid fa-circle-arrow-down inv_icon" /></button>
                  </div>
                  <button className="circular"  onClick={onReward}
                        disabled={earnings.eq(0) || !canClaimReward}>Claim Rewards <img src="https://s2.coinmarketcap.com/static/img/coins/200x200/15933.png" className="button_symbol" alt="" /></button>                            
                </div>
              </div>
            </div>
          </div>
          <div className="translucent_box" id="latest_news">
            <p className="bold_big" id="latest_news_text">Latest News</p>
          </div>
        </div>
        {/*Farms Section*/}
        <div className="translucent_box" id="bomb_farms">
          <div id="farms_header">
            <div className="farms_title">
              <p className="bold_big" id="farms_main_title">Bomb Farms</p>
              <p className="regular">Stake your LP tokens in our farms to start earning $BSHARE</p>
            </div>
            <button className="circular">Claim All <img src="https://s2.coinmarketcap.com/static/img/coins/200x200/15933.png" className="button_symbol" alt="" /></button>
          </div>
          <div id="btcb_header">
            <img src="https://app.bomb.money/static/media/bomb-bitcoin-LP.084590b2.png" className="title_img" alt="" />
            <div id="btcb_header_text">
              <div id="btcb_title">
                <p className="bold_big">BOMB-BTCB</p>
                <p className="tag_green">Recommended</p>
              </div>
              <p className="regular">TVL: <span className="semi_bold">$1,008,430</span></p>
            </div>
          </div>
          <hr align="right" />
          <div id="btcb_content" className="table_container" style={{"overflowX":"auto"}}>
            <table>
              <tbody><tr className="regular">
                  <th className="stat_table_head">Daily Returns:</th>
                  <th className="stat_table_head">Your Stake:</th>
                  <th className="stat_table_head">Earned:</th>
                </tr>
                <tr>
                  <td className="bold_big stat_table_cell">2%</td>
                  <td className="bold_small stat_table_cell"><img src="https://app.bomb.money/static/media/bomb-bitcoin-LP.084590b2.png" className="curr_symbol" alt="" />124.21<br />
                    <p className="semi_bold">≈ $1171.62</p></td>
                  <td className="bold_small stat_table_cell"><img src="https://s2.coinmarketcap.com/static/img/coins/200x200/15933.png" className="curr_symbol" alt="" />6.4413<br />
                    <p className="semi_bold">≈ $298.88</p></td>
                </tr>
              </tbody></table>
            <div>
              <button className="circular">Deposit <i className="fa-solid fa-circle-arrow-up inv_icon" /></button>
              <button className="circular">Withdraw <i className="fa-solid fa-circle-arrow-down inv_icon" /></button>
              <button className="circular">Claim Rewards <img src="https://s2.coinmarketcap.com/static/img/coins/200x200/15933.png" className="button_symbol" alt="" /></button>                            
            </div>
          </div>
          <hr className="hr_total" />
          <div id="btcb_header">
            <img src="https://app.bomb.money/static/media/bshare-bnb-LP.9144444a.png" className="title_img" alt="" />
            <div id="btcb_header_text">
              <div id="btcb_title">
                <p className="bold_big">BSHARE-BNB</p>
                <p className="tag_green">Recommended</p>
              </div>
              <p className="regular">TVL: <span className="semi_bold">$1,008,430</span></p>
            </div>
          </div>
          <hr align="right" />
          <div id="btcb_content" className="table_container" style={{"overflowX":"auto"}}>
            <table>
              <tbody><tr className="regular">
                  <th className="stat_table_head">Daily Returns:</th>
                  <th className="stat_table_head">Your Stake:</th>
                  <th className="stat_table_head">Earned:</th>
                </tr>
                <tr>
                  <td className="bold_big stat_table_cell">2%</td>
                  <td className="bold_small stat_table_cell"><img src="https://app.bomb.money/static/media/bshare-bnb-LP.9144444a.png" className="curr_symbol" alt="" />124.21<br />
                    <p className="semi_bold">≈ $1171.62</p></td>
                  <td className="bold_small stat_table_cell"><img src="https://s2.coinmarketcap.com/static/img/coins/200x200/15933.png" className="curr_symbol" alt="" />6.4413<br />
                    <p className="semi_bold">≈ $298.88</p></td>
                </tr>
              </tbody></table>
            <div>
              <button className="circular">Deposit <i className="fa-solid fa-circle-arrow-up inv_icon" /></button>
              <button className="circular">Withdraw <i className="fa-solid fa-circle-arrow-down inv_icon" /></button>
              <button className="circular">Claim Rewards <img src="https://s2.coinmarketcap.com/static/img/coins/200x200/15933.png" className="button_symbol" alt="" /></button>                                         
            </div>
          </div>
        </div>
        {/*Bonds Section*/}
        <div className="translucent_box" id="bonds">
          <div className="boardroom_head">
            <img src="https://app.bomb.money/static/media/bbond.6a97acfd.png" className="title_img" alt="" />
            <div className="boardroom_head_text">
              <p className="bold_big">Bonds</p>
              <p className="regular">BBOND can be purchased only on contraction periods, when TWAP of BOMB is below 1</p>
            </div>
          </div>  
          <div className="boardroom_content table_container" style={{"overflowX":"auto"}}> 
            <table>
              <tbody><tr className="regular">
                  <th className="stat_table_head">Current Price: (BOMB)^2</th>
                  <th className="stat_table_head">Available to Redeem:</th>
                </tr>
                <tr>
                  <td className="bold_small stat_table_cell">BBOND = { Number(tBondStats?.tokenInFtm).toFixed(4) || '-' } BTCB</td>
                  <td className="bold_big stat_table_cell"><img src="https://s2.coinmarketcap.com/static/img/coins/200x200/15876.png" className="curr_symbol" alt="" 
                    />{`${getDisplayBalance(bondBalance)}`}</td>
                </tr>
              </tbody></table>
            <div>
              <div className="bonds_item">
                <p className="semi_bold">Purchase BBond<br /><span className="regular">{!isBondPurchasable ? 'BOMB is over peg'
                                                                                        : getDisplayBalance(bondsPurchasable, 18, 4) + ' BBOND available for purchase'
                                                                                        }</span></p>
                <button className="circular" onClick={handleBuyBonds}
                    disabled={!tBondStats || isBondRedeemable}>Purchase <i className="fa-solid fa-cart-shopping" /></button>
              </div>
              <hr id="mini_divider" />
              <div className="bonds_item">
                <p className="semi_bold">Redeem Bomb</p>
                <button className="circular"  onClick={handleRedeemBonds}
                  disabled={!tBondStats || bondBalance.eq(0) || !isBondRedeemable}>Redeem <i className="fa-solid fa-circle-arrow-down inv_icon" /></button>
              </div>
            </div>
          </div>  
        </div>
      </div>);
}

export default HtmlComponent;
