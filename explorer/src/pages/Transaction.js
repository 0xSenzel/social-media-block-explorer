import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { utils, providers, ethers } from "ethers";
import { getProviderURL } from "../utils/utils.js";
import "../assets/css/App.css";
import { contractABI } from "./contractABI.js";
const { JsonRpcProvider } = providers;

export default function Transaction() {
  const { search } = window.location;
  const path = window.location.href.split("/");
  let searchHash = "";
  if (!search.toString().includes("?s=")) {
    searchHash = path[path.length - 1];
  } else {
    searchHash = new URLSearchParams(search).get("s");
  }
  const [blockHash, setblockHash] = useState(0);
  const [blockNumber, setblockNumber] = useState(0);
  const [confirmations, setconfirmations] = useState(0);
  const [data, setdata] = useState(0);
  const [from, setfrom] = useState(0);
  const [gasLimit, setgasLimit] = useState(0);
  const [gasPrice, setgasPrice] = useState(0);
  const [hash, sethash] = useState(0);
  const [networkId, setnetworkId] = useState(0);
  const [nonce, setnonce] = useState(0);
  const [r, setr] = useState(0);
  const [raw, setraw] = useState(0);
  const [s, sets] = useState(0);
  const [to, setto] = useState(0);
  const [transactionIndex, settransactionIndex] = useState(0);
  const [value, setvalue] = useState(0);
  let history = useHistory();
  const [comments, setComments] = useState("");
  //const [upvoteAddress, setUpvoteAddress] = useState("");
  const [msg, setMsg] = useState([]);
  const contractAddress = "0xAD384C5121896eB0E729A679Bc6df1B4FC58D84a";
  
  function handleClick() {
    history.push("/");
  }

  const getComments = async () => {
    try{
      const {ethereum} = window;
      if(ethereum) {
        const { ethereum } = window;
        const provider = new ethers.providers.Web3Provider(ethereum);
        const commentDAO = new ethers.Contract(contractAddress, contractABI, provider);
        
        console.log("searchHash:",searchHash); 
        console.log("contract address:", commentDAO.address);

        const allComments = await commentDAO.getCommentsByTxHash(searchHash); 
        console.log("Comments:",allComments);
        setMsg(allComments);
      } else {
        console.log("Ethereum not detected")
      }
    } catch (error) {
      console.log(error)
  }
  } 

  const writeComments = async () => {
    try{
      const {ethereum} = window;
      if(ethereum) {
        await ethereum.enable();
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const commentDAO = new ethers.Contract(contractAddress, contractABI, signer);
        const commentTxn = await commentDAO.addCommentByTxHash(searchHash, comments,{gasLimit:300000});
        console.log("Mining...", commentTxn.hash)

        await commentTxn.wait();
        console.log("Mined -- ", commentTxn.hash);
      } else {
        console.log("Ethereum not detected")
      }
      
    } catch (error) {
      console.log(error)
  }   
  } 

  const addLikes = async (addr) => {
    try{
      const {ethereum} = window;
      if(ethereum) {
        await ethereum.enable();
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const commentDAO = new ethers.Contract(contractAddress, contractABI, signer);
        // await commentDAO.addLikeByTxHashAuthor(searchHash, upvoteAddress);
        const likeTxn = await commentDAO.addLikeByTxHashAuthor(searchHash, addr);
        console.log("Mining...", likeTxn.hash)

        await likeTxn.wait();
        console.log("Mined -- ", likeTxn.hash);
      } else {
        console.log("Ethereum not detected")
      }
    } catch (error) {
      console.log(error);
    }
  }

  const renderComments = (msg) => {
    if (msg != null) {
      return msg.map(msg => {
        return (
          <div key={msg.id}> 
            <p><i>Author:</i> {msg.author}</p>
            <p><i>Content:</i> <b>{msg.content}</b></p>
            <p><i>Likes:</i> {msg.likes.length}</p>
            {<button onClick={() => addLikes(msg.author)} >Upvote</button>}
            <p>_____________________________________________</p>
          </div>
        );
      });
    }
  };

  useEffect(() => {
    (async () => {
      const provider = new JsonRpcProvider(getProviderURL());
      const blockChainInfo = await provider.getTransaction(searchHash);
      //console.log("transaction searched:", blockChainInfo);
      setblockHash(blockChainInfo.blockHash);
      setblockNumber(blockChainInfo.blockNumber);
      setconfirmations(blockChainInfo.confirmations);
      setdata(blockChainInfo.data);
      setfrom(blockChainInfo.from);
      setgasLimit(utils.formatEther(blockChainInfo.gasLimit._hex));
      setgasPrice(utils.formatEther(blockChainInfo.gasPrice._hex));
      sethash(blockChainInfo.hash);
      setnetworkId(blockChainInfo.networkId);
      setnonce(blockChainInfo.nonce);
      setr(blockChainInfo.r);
      setraw(blockChainInfo.raw);
      sets(blockChainInfo.s);
      setto(blockChainInfo.to);
      settransactionIndex(blockChainInfo.transactionIndex);
      setvalue(utils.formatEther(blockChainInfo.value._hex));
      getComments();
      renderComments(msg);
    })();
  }, []);

  return (
    <div>
      <div className="App-search-container">
        <h1 className="section-header">Transaction:</h1>
        <b>Block Hash</b>: {blockHash}
        <br />
        <b>Block Number</b>: {blockNumber}
        <br />
        <b>Data</b>:<div><a style={{width: 600, height: 100,overflow: 'scroll', display: 'block'}}>{data}</a></div>
        <br />
        <b>From</b>: {from}
        <br />
        <b>Gas Limit</b>: {gasLimit}
        <br />
        <b>Gas Price</b>: {gasPrice}
        <br />
        <b>Hash</b>: {hash}
        <br />
        <b>Nonce</b>: {nonce}
        <br />
        <b>To</b>: {to}
        <br />
        <b>Commentary</b>: <p>{renderComments(msg)}</p>
        <br/>
        <input className="commentBox"
        placeholder="Enter commentary here..."
        onChange={(e) => setComments(e.target.value)}
        ></input>
        <button className="comment" onClick={writeComments} >Comment</button>
        <button className="comment" onClick={getComments} >Update</button>
      </div>
      <br />
      <button className="go-home-button" type="button" onClick={handleClick}>
        Go home
      </button>
    </div>
  );
}
