DROP TABLE IF EXISTS public.daily_expenses;

CREATE TABLE public.daily_expenses (
    expense_id SERIAL PRIMARY KEY,                    
    expense_date DATE NOT NULL,                       
    expense_category VARCHAR(50) NOT NULL,            
    expense_description TEXT,                         
    expense_amount DECIMAL(10, 2) NOT NULL,           
    expense_payment_method VARCHAR(50),               
    expense_location VARCHAR(100),                    
    expense_notes TEXT,                               
    user_id INTEGER NOT NULL,                         
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),    
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),    
    FOREIGN KEY (user_id) REFERENCES public."User"(id) ON DELETE CASCADE  
);

DROP TABLE IF EXISTS public.daily_incomes;

CREATE TABLE public.daily_incomes (
    income_id SERIAL PRIMARY KEY,
    income_date DATE NOT NULL,
    income_category VARCHAR(50) NOT NULL,
    income_description TEXT,
    income_amount DECIMAL(10, 2) NOT NULL,
    income_source VARCHAR(50),
    income_location VARCHAR(100),
    income_notes TEXT,
    user_id INT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    FOREIGN KEY(user_id) REFERENCES "User"(id) ON DELETE CASCADE
);

CREATE TABLE transaction_type (
    trans_type_id SERIAL PRIMARY KEY,
    trans_type_name VARCHAR(50) NOT NULL, 
    trans_type_created_at TIMESTAMPTZ DEFAULT NOW(),
    trans_type_updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE transaction_type
ADD COLUMN trans_type_classification CHAR(1);

CREATE TABLE transaction_category (
    trans_cat_id SERIAL PRIMARY KEY,
    trans_cat_name VARCHAR(100) NOT NULL,  -- Ej: Alquiler, Sueldo, etc.
    trans_cat_trans_type_id INT NOT NULL REFERENCES transaction_type(trans_type_id),  -- Relación con transaction_type
    trans_cat_status VARCHAR(20) DEFAULT 'Activo',  -- Estado de la categoría (Activo/Inactivo)
    trans_cat_description TEXT,
    trans_cat_created_at TIMESTAMPTZ DEFAULT NOW(),
    trans_cat_updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE transactions (
    trans_id SERIAL PRIMARY KEY,
    trans_date DATE NOT NULL,
    trans_amount DECIMAL(10, 2) NOT NULL,
    trans_payment_method VARCHAR(50),  -- Ej: Tarjeta, Efectivo, etc.
    trans_location VARCHAR(100),  -- Ubicación opcional
    trans_notes TEXT,
	trans_description TEXT,
    trans_cat_id INT NOT NULL REFERENCES transaction_category(trans_cat_id),  -- Relación con la categoría
	trans_user_id INT NOT NULL,
    trans_created_at TIMESTAMPTZ DEFAULT NOW(),
    trans_updated_at TIMESTAMPTZ DEFAULT NOW(),
	FOREIGN KEY(trans_user_id) REFERENCES "User"(id) ON DELETE CASCADE
);

CREATE TABLE payment_methods (
	pay_method_id SERIAL PRIMARY KEY,
	pay_method_name VARCHAR(50) UNIQUE NOT NULL
)

ALTER TABLE transactions
DROP COLUMN trans_payment_method,
ADD COLUMN trans_payment_method_id INT REFERENCES payment_methods(pay_method_id);