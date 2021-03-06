package com.food.order.controller;

import com.food.order.model.MsgVo;
import com.food.order.model.config.Config;
import com.food.order.model.criteria.Criteria;
import com.food.order.model.criteria.Restrictions;
import com.food.order.model.entity.*;
import com.food.order.model.repository.*;
import com.food.order.model.service.PluginsServiceImpl;
import com.food.order.plugins.PluginsService;
import com.food.order.plugins.oauth.OauthService;
import com.food.order.plugins.oauth.OauthUtil;
import com.food.order.plugins.pay.PayUtil;
import com.food.order.plugins.pay.PaymentService;
import com.food.order.utils.utils.MD5Util;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Controller
public class IndexController extends BaseController{

    @Autowired
    ConsumerRepository consumerRepository;
    @Autowired
    TablesRepository tablesRepository;
    @Autowired
    OauthConfigRepository oauthConfigRepository;
    @Autowired
    PaymentsConfigRepository paymentsConfigRepository;
    @Autowired
    TmpCacheRepository tmpCacheRepository;
    @Autowired
    UserRepository userRepository;

    @Autowired
    OauthUserRepository oauthUserRepository;


    @GetMapping("/google6ec349d68403e60b.html")
    public String goodsSearch(){
        return "google6ec349d68403e60b";
    }

    @GetMapping("/")
    public String index(){
        return "index";
    }

    @GetMapping("/table/{uuid}")
    public String goPage(@PathVariable("uuid")String uuid,
                        HttpSession session,
                        HashMap<String, Object> map) {
        Criteria<Tables> tablesCriteria = new Criteria<>();
        tablesCriteria.add(Restrictions.eq("uuid",uuid));
        Tables tables = tablesRepository.findOne(tablesCriteria).orElse(null);
        if(tables == null){
            //TODO ????????????
            map.put("msg","???????????????001");
            return "error";
        }
        Store store = tables.getStore();
        //TODO ?????????????????????

        String usedMainConfigMsg = "";
        if(store.getConfigType() == 1) {//??????????????????
            usedMainConfigMsg = "(?????????????????????)";
        }
        String token = null;

        //??????????????????
        Criteria<OauthConfig> oauthConfigCriteria = new Criteria<>();
        if(store.getConfigType() == 1){//??????????????????
            oauthConfigCriteria.add(Restrictions.eq("mainStore",store.getMainStore()));
        }else if(store.getConfigType() == 2){//????????????
            oauthConfigCriteria.add(Restrictions.eq("store",store));
        }
        oauthConfigCriteria.add(Restrictions.eq("status",2));
        List<OauthConfig> oauthConfigs = oauthConfigRepository.findAll(oauthConfigCriteria);

        //????????????????????????????????????
        token = (String)session.getAttribute("token");
        if(token != null && !token.equals("")){//???token,??????token????????????????????????
            TmpCache tmpCache = tmpCacheRepository.findOneByCKey(token);
            if(tmpCache == null || tmpCache.getEndTime() < System.currentTimeMillis()){//?????????
                token = null;
            }else{
                User user =  userRepository.findById(Long.parseLong(tmpCache.getCValue())).orElse(null);
                if(user == null || user.isDelete() || user.getBelong() != 5){//???????????????
                    token = null;
                }
            }
            if(token != null){
                tmpCache.setEndTime(tmpCache.getEndTime()+tmpCache.getExpireTime());//???????????????
                tmpCacheRepository.save(tmpCache);
            }
        }
        //TODO ??????????????????????????????????????????
        if(store.getPayConfig() == 1){//????????????????????????????????????,????????????????????????

            //TODO ??????????????????????????????
            if(token == null || token.equals("")) {//????????????????????????
                if(oauthConfigs.size() == 0){
                    //TODO ????????????????????????
                    map.put("msg","??????????????????????????????????????????"+usedMainConfigMsg+",??????????????????002");
                    return "error";
                }
//                if(oauthConfigs.size() > 1){
//
//                }
                //???????????????????????????
                OauthConfig oauthConfig = oauthConfigs.get(0);
                OauthService oauthService = new OauthUtil().getOauthClass(oauthConfig,Config.host);

                PluginsService pluginsService = (PluginsService)oauthService;
                MsgVo msgVo = pluginsServiceImpl.checkPlugins(null,store,pluginsService.getPluginsTag());
                if(msgVo.getCode() != 0){
                    map.put("msg",""+pluginsService.getName()+":"+msgVo.getMsg()+"005");
                    return "error";
                }
                session.setAttribute("callback_url",Config.host + "/table/"+uuid);
                return "redirect:"+oauthService.getConsumerOauthUrl();//?????????????????????
            }
        }else{//???????????????????????????????????????
            if(token == null || token.equals("")) {//????????????????????????
                if (oauthConfigs.size() == 0) {//????????????????????????????????????????????????
                    Criteria<Consumer> consumerCriteria = new Criteria<>();
                    consumerCriteria.add(Restrictions.eq("wxOpenId", "-1"));
                    consumerCriteria.add(Restrictions.eq("store", tables.getStore()));
                    Consumer consumer = consumerRepository.findOne(consumerCriteria).orElse(null);
                    if (consumer == null) {
                        consumer = new Consumer();
                        consumer.setMainStore(tables.getStore().getMainStore());
                        consumer.setStore(tables.getStore());
                        consumer.setUser(tables.getStore().getUser());//????????????????????????
                        consumer.setWxOpenId("-1");
                        consumer.setName("?????????");
                        consumer.setNickName("??????????????????");
                        consumerRepository.save(consumer);
                    }
                    removeToken(consumer.getUser());
                    saveToken("consumer", consumer.getUser(), 1);
                    token = consumer.getUser().getAccessToken();
                }else{//???????????????????????????????????????
                    OauthConfig oauthConfig = oauthConfigs.get(0);
                    oauthConfig.setStore(tables.getStore());
                    OauthService oauthService = new OauthUtil().getOauthClass(oauthConfig,Config.host);
                    session.setAttribute("callback_url",Config.host + "/table/"+uuid);
                    return "redirect:"+oauthService.getConsumerOauthUrl();//?????????????????????
                }
            }
        }
        //TODO ??????????????????

        TmpCache tmpCache = tmpCacheRepository.findOneByCKey(token);
        User user =  userRepository.findById(Long.parseLong(tmpCache.getCValue())).orElse(null);
        Criteria<Consumer> criteria = new Criteria<>();
        criteria.add(Restrictions.eq("user",user));
        Consumer consumer = consumerRepository.findOne(criteria).orElse(null);
        if(consumer.getWxOpenId() == null || !consumer.getWxOpenId().equals("-1")) {//?????????????????????????????????
            // ????????????????????????????????????????????????
            Criteria<OauthUser> oauthUserCriteria = new Criteria<>();
            oauthUserCriteria.add(Restrictions.eq("user", consumer.getUser()));
            OauthUser oauthUser = oauthUserRepository.findOne(oauthUserCriteria).orElse(null);//
            if (oauthUser == null && store.getPayConfig() == 1) {

                map.put("msg", "???????????????????????????????????????????????????"+usedMainConfigMsg+"003");
                return "error";
            } else {
                if(oauthUser != null) {
                    List<String> tag = new PayUtil().getTagsByOauthTag(oauthUser.getTag());
                    Criteria<PaymentsConfig> paymentsConfigCriteria = new Criteria<>();
                    if (consumer.getStore().getConfigType() == 1) {//???????????????????????????
                        paymentsConfigCriteria.add(Restrictions.eq("mainStore", consumer.getStore().getMainStore()));
                    } else {
                        paymentsConfigCriteria.add(Restrictions.eq("store", consumer.getStore()));
                    }
                    paymentsConfigCriteria.add(Restrictions.in("tag", tag));
                    List<PaymentsConfig> paymentsConfigs = paymentsConfigRepository.findAll(paymentsConfigCriteria);
                    if (paymentsConfigs.size() == 0 && store.getPayConfig() == 1) {
                        List<PaymentService> paymentServices =  new PayUtil().getPaymentClass(oauthUser.getTag());
                        if(paymentServices.size() == 0){
                            map.put("msg", "???????????????????????????????????????????????????"+usedMainConfigMsg+"005");
                            return "error";
                        }
                        PluginsService pluginsService = (PluginsService)paymentServices.get(0);
                        map.put("msg", "????????????????????????" + pluginsService.getName() + "??????????????????????????????????????????"+usedMainConfigMsg+"004");
                        return "error";
                    }
                }
            }
        }

        //??????????????????????????????
        Map<String,String> params = new HashMap<>();
        params.put("token",""+token);
        params.put("table_id",""+tables.getId());
        params.put("t",""+System.currentTimeMillis());
        String url = getPageViewUrl(tables.getStore(),"",params);
        return "redirect:"+url;
         //return "redirect:"+host+"/default/index.html?token="+token+"&table_id="+tables.getId();//?????????????????????
        //return "redirect:http://localhost:8081/#/?token="+token+"&table_id="+tables.getId();//??????????????????
    }


    protected boolean saveToken(String tag, User user, int days){
        String token = null;
        try {
            token = MD5Util.MD5Encode(tag+"_"+user.getAccount()+"#@#"+user.getId()+"#@#"+System.currentTimeMillis());
            TmpCache tmpCache = new TmpCache();
            tmpCache.setCValue(""+user.getId());
            tmpCache.setCKey(token);
            if(days == 0){
                days = tmpCache.getExpireTime();
            }else{
                days = 3600*1000*24*days;
            }
            tmpCache.setEndTime(tmpCache.getCreateTime().getTime()+ days);//???????????????7???????????????
            tmpCacheRepository.save(tmpCache);
            user.setAccessToken(token);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }
    protected boolean removeToken(User user){
        try {
            if(user.getAccessToken() != null) {
                TmpCache tmpCache = tmpCacheRepository.findOneByCKey(user.getAccessToken());
                if(tmpCache != null){
                    tmpCacheRepository.delete(tmpCache);
                }
                user.setAccessToken(null);
            }
            return true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }
}
