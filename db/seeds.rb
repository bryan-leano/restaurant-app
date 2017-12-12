10.times do
    Menu.create(
      dish: Faker::Food.dish,
      ingredient: Faker::Food.ingredient,
      price: Faker::Commerce.price.to_f,
    )
  end
