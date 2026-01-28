module "production" {
  source = "../modules/web_app"
  flixtube_az_container_registry_name = var.flixtube_az_container_registry_name
  flixtube_az_region_name = var.flixtube_az_region_name
  flixtube_az_subscription_id = var.flixtube_az_subscription_id
  flixtube_az_resource_group_name = var.flixtube_az_resource_group_name
}
