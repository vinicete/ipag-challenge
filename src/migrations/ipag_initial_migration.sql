CREATE EXTENSION IF NOT EXISTS "pgcrypto";

BEGIN;

CREATE TABLE IF NOT EXISTS public.customers
(
    cust_id uuid NOT NULL DEFAULT gen_random_uuid(),
    cust_name character varying(255) NOT NULL,
    cust_document character varying(20) NOT NULL,
    cust_email character varying(255) NOT NULL,
    cust_phone character varying(20),
    cust_created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (cust_id),
    UNIQUE (cust_document),
    UNIQUE (cust_email)
);

CREATE TABLE IF NOT EXISTS public.product
(
    prod_id uuid NOT NULL DEFAULT gen_random_uuid(),
    prod_name character varying(255) NOT NULL,
    prod_description text,
    prod_value numeric(10, 2) NOT NULL,
    PRIMARY KEY (prod_id)
);

CREATE TABLE IF NOT EXISTS public.orders
(
    ord_id uuid NOT NULL DEFAULT gen_random_uuid(),
    cust_id uuid NOT NULL,
    ord_total_value numeric(10, 2) NOT NULL,
    ord_status character varying(20) NOT NULL DEFAULT 'PENDING',
    ord_created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    ord_updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (ord_id),
    CONSTRAINT fk_customer
        FOREIGN KEY (cust_id) REFERENCES public.customers (cust_id)
);

CREATE TABLE IF NOT EXISTS public.order_items
(
    oi_id uuid NOT NULL DEFAULT gen_random_uuid(),
    ord_id uuid NOT NULL,
    prod_id uuid NOT NULL,
    oi_quantity integer NOT NULL,
    oi_purchase_value numeric(10, 2) NOT NULL,
    PRIMARY KEY (oi_id),
    CONSTRAINT fk_order
        FOREIGN KEY (ord_id) REFERENCES public.orders (ord_id),
    CONSTRAINT fk_product
        FOREIGN KEY (prod_id) REFERENCES public.product (prod_id),
    
    UNIQUE (ord_id, prod_id)
);

CREATE TABLE IF NOT EXISTS public.notification_logs
(
    not_id uuid NOT NULL DEFAULT gen_random_uuid(),
    ord_id uuid NOT NULL,
    not_old_status character varying(50) NOT NULL,
    not_new_status character varying(50) NOT NULL,
    not_message text,
    not_created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (not_id),
    CONSTRAINT fk_order_log
        FOREIGN KEY (ord_id) REFERENCES public.orders (ord_id)
);

END;