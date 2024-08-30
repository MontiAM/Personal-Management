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

