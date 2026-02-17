resource "azurerm_cosmosdb_account" "cosmosdb_account" {
  name                = var.flixtube_cosmosdb_account_name
  location            = var.flixtube_az_region_name
  resource_group_name = var.flixtube_az_resource_group_name
  offer_type          = "Standard" # Default for MongoDB API accounts; serverless is a capacity mode.
  kind                = "MongoDB"
  
  free_tier_enabled   = true 

  # Set to Eventual consistency for the cheapest option.
  consistency_policy {
    consistency_level = "Eventual"
  }

  # Define geo-locations for the account. For cheapest, one location is sufficient.
  geo_location {
    location          = var.flixtube_az_region_name
    failover_priority = 0
  }

  capabilities {
    name = "EnableMongo"
  }
}

resource "azurerm_cosmosdb_mongo_database" "mongo_databases" {
  for_each            = toset(["history", "metadata", "video-streaming"])
  name                = each.key
  resource_group_name = azurerm_cosmosdb_account.cosmosdb_account.resource_group_name
  account_name        = azurerm_cosmosdb_account.cosmosdb_account.name
}