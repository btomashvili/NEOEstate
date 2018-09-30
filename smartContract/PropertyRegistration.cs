using Neo.SmartContract.Framework;
using Neo.SmartContract.Framework.Services.Neo;
using Neo.SmartContract.Framework.Services.System;
using System;
using System.ComponentModel;
using System.Numerics;
using Helper = Neo.SmartContract.Framework.Helper;

namespace Neo.SmartContract
{
    public class PropertyRegistration : Framework.SmartContract
    {
        [DisplayName("registerEvent")]
        public static event Action<string, byte[], string> RegisterEvent;

        [DisplayName("transferEvent")]
        public static event Action<string, byte[], byte[]> TransferEvent;

        public static object Main(string operation, params object[] args)
        {
            if (operation == "registerProperty"){
                Property property = new Property
                {
                    owner = (byte[])args[0],
                    propertyId = (string)args[1],
                    cadastral = (string)args[2],
                    mapAddress = (string)args[3],
                    area = (string)args[4],
                    link = (string)args[5],
                    status = (string)args[6],
                    type = (string)args[7],
                    registrationDate = (string)args[8],
                };

                if(property.cadastral != "Mortgage"){
                    SaveProperty(property);
                }else{
                    var key = "property:propertyId=" + property.propertyId;
                    var value = "propertyId=" + property.propertyId + "&cadastral=" + property.cadastral;
                    Storage.Put(Storage.CurrentContext, key, value);
                }
                return true;
            }

            if (operation == "transferProperty")
            {
                TransferProperty((string)args[0], (string)args[1], (string)args[2],
                                 (string)args[3], (string)args[4], (string)args[5],
                                 (BigInteger)args[6], (byte[])args[7], (byte[])args[8]);
                return true;
            }

            if (operation == "getOrder"){
                return GetOrder((string)args[0]);
            }

            if (operation == "sendOffer"){
                byte[] buyer = (byte[])args[0];
                byte[] seller= (byte[])args[1];
                string propertyId = (string)args[2];

                if (propertyId != "") return true;

                Property property = GetPropertyObject(propertyId);
                if (property == null) return false;
                if(property.owner != seller){
                    return false;
                }
                return property;
            }

            if (operation == "sendOffer2")
            {
                return true;
            }

            if(operation == "verifyTransaction"){
                byte[] to = (byte[])args[0];
                byte[] from = (byte[])args[1];
                string propertyId = (string)args[2];
                string orderId = (string)args[3];
                BigInteger price = (BigInteger)args[4];
                byte[] signature = (byte[])args[5];
                return verifyTransaction(to, from, propertyId, orderId, price, signature);
            }

            if (operation == "getPropertyData"){
                var key = "property:propertyId=" + (string)args[0];
                return Storage.Get(Storage.CurrentContext, key);
            }

            if (operation == "getProperty")
            {
                return GetProperty((string)args[0]);
            }


            return true;
        }

        private static bool TransferProperty(string orderId, string propertyId, string orderNumber,
                                            string orderDate, string status, string paymentType,
                                             BigInteger price, byte[] from, byte[] to)
        {
            if (!Runtime.CheckWitness(from)) return false;

            if (status != "active") {
                return false;
            }

            Order oldOrder = GetOrderObject(orderId);
            //Check if order exist
            if (oldOrder == null) return false;

            Property oldProperty = GetPropertyObject(propertyId);
            //Check if property exist
            if (oldProperty == null) return false;

            Order order = new Order
            {
                orderId = orderId,
                propertyId = propertyId,
                orderNumber = orderNumber,
                orderDate = orderDate,
                from = from,
                to = to,
                status = status,
                paymentType = paymentType,
                price = price
            };
            SaveOrder(order);

            TransferEvent(order.orderId, order.from, order.to);
            return true;
        }

        public static void SaveProperty(Property property)
        {
            var key = "property:propertyId=" + property.propertyId;
            var value = "propertyId=" + property.propertyId + "&cadastral=" + property.cadastral;

            Storage.Put(Storage.CurrentContext, key, value);

            RegisterEvent(property.propertyId, property.owner, property.cadastral);
        }

        public static byte[] GetProperty(string propertyId)
        {
            var key = "property:propertyId=" + propertyId;
            return Storage.Get(Storage.CurrentContext, key);
        }

        public static void SaveOrder(Order order)
        {
            var key = "order:propertyId=" + order.orderId;

            var value = "orderId=" + order.orderId + "orderNumber=" + order.orderNumber;
            // + "orderDate=" + order.orderDate + "status=" + order.status + "paymentType=" + order.paymentType +
            //"price=" + order.price + "from=" + order.from + "to=" + order.to;

            Storage.Put(Storage.CurrentContext, key, value);
        }

        public static byte[] GetOrder(string orderId)
        {
            var key = "order:propertyId=" + orderId;

            return Storage.Get(Storage.CurrentContext, key);
        }

        public static Property GetPropertyObject(string propertyId) {
            byte[] array = GetProperty(propertyId);
            string result = array.AsString();

            Property property = new Property();
            return property;
        }

        public static Order GetOrderObject(string orderId)
        {
            byte[] array = GetOrder(orderId);
            string result = array.AsString();

            Order order = new Order();
            return order;
        }

        public static void SaveOffer(byte[] buyer, byte[] seller, string propertyId)
        {
            var key = "offer:=buyer" + buyer.AsString() + "&propertyId="+ propertyId;

            var value = "seller=" + seller.AsString();
            Storage.Put(Storage.CurrentContext, key, value);
        }

        public static bool verifyTransaction(byte[] to, byte[] from, string propertyId,
                                             string orderId, BigInteger price, byte[] signature)
        {
            if (VerifySignature(signature, from)) return true;
            if (!VerifySignature(signature, to)) return false;
            Order order = GetOrderObject(orderId);
            if (order == null) return false;
            Property property = GetPropertyObject(propertyId);
            if (order == null) return false;

            if (order.from != from){
                return false;
            }

            if(order.price > price){
                return false;
            }

            if (order.to != to)
            {
                return false;
            }

            return true;
        }

    }

    [Serializable]
    public class Property
    {
        public byte[] owner;
        public string propertyId;
        public string cadastral;
        public string mapAddress;
        public string area;
        public string link;
        public string status;
        public string type;
        public string registrationDate;
    }

    [Serializable]
    public class Order
    {
        public string orderId; //order unique id
        public string propertyId; // property unique id in blockchain
        public string orderNumber;
        public string orderDate; // order registration date
        public string status; //in progress, declined, confirmed
        public string paymentType; //Bank, Neo
        public BigInteger price; //sell price
        public byte[] from; // who sell property
        public byte[] to; // who boy property

    }
}
