/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package tablegenproject;

import entities.MyOrder;
import entities.OrderItem;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

/**
 *
 * @author Daniel Dang
 */
public class TableGenProject {

    public static void main(String[] args) {
        Object object = null;
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("persistence");
        EntityManager em = emf.createEntityManager();
        em.getTransaction().begin();
        try {
            MyOrder order = new MyOrder();
            order.setOrder_date("06/21/2016");
            
            OrderItem item = new OrderItem();
            item.setName("Socks");
            item.setPrice(9.99);
            item.setQuantity(1);
            item.setOrder(order);
            
            List<OrderItem> list = new ArrayList<OrderItem>();
            list.add(item);
            order.setItems(list);
            
            em.persist(order);
            em.persist(item);
            
            em.getTransaction().commit();
        } catch (Exception e) {
            e.printStackTrace();
            em.getTransaction().rollback();
        } finally {
            em.close();
        }
    }
    
}
